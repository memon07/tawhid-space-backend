import { env, isProduction } from '@config/env';
import jwt from 'jsonwebtoken';
import { otpRepository } from '@repositories/otp.repository';
import { userRepository } from '@repositories/user.repository';
import { LoginInput, OtpPurpose, RequestOtpInput, SavePasswordInput, VerifyOtpInput } from '@/types/auth';
import { User } from '@models/index';
import { HttpError } from '@utils/http-error';
import { normalizePhoneE164 } from '@utils/phone';
import { hashPassword, verifyPassword } from '@utils/hash';
import { otpService } from './otp.service';
import { tokenService } from './token.service';

const ensureUserForPurpose = async (phoneNumber: string, purpose: OtpPurpose) => {
  const existingUser = await userRepository.findByPhone(phoneNumber);

  if (existingUser) {
    return existingUser;
  }

  if (purpose === 'signup') {
    return userRepository.create(phoneNumber);
  }

  throw new HttpError(404, 'User not found for this phone number');
};

const calculateAge = (birthDate: string | null): number | null => {
  if (!birthDate) {
    return null;
  }

  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getUTCFullYear() - date.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - date.getUTCMonth();
  const dayDiff = today.getUTCDate() - date.getUTCDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age < 0 ? null : age;
};

const buildUserPayload = (user: User) => {
  const age = calculateAge(user.birthDate ?? null);
  return {
    id: user.id,
    phoneNumber: user.phoneNumber,
    name: user.fullName,
    age,
    language: user.preferredLanguage,
    onboarding: user.isOnboarded,
    timingsSalat: null,
    emotion: null,
    details: {
      gender: user.gender,
      birthDate: user.birthDate,
      profileImageUrl: user.profileImageUrl
    },
    settings: {
      preferredLanguage: user.preferredLanguage
    }
  };
};

export const authService = {
  async requestOtp(
    payload: RequestOtpInput
  ): Promise<{ message: string; otpCode?: string; otp: Record<string, number> }> {
    const phoneNumber = normalizePhoneE164(payload.phoneNumber);
    const existingUser = await userRepository.findByPhone(phoneNumber);
    if (!existingUser && payload.purpose !== 'signup') {
      throw new HttpError(404, 'User not found for this phone number');
    }

    const result = await otpService.requestOtp(phoneNumber, payload.purpose, existingUser?.id);

    if (isProduction) {
      return {
        message: 'OTP sent',
        otp: {
          length: env.otp.length,
          expirySeconds: env.otp.expirySeconds,
          resendDelaySeconds: env.otp.resendDelaySeconds,
          maxAttempts: env.otp.maxAttempts
        }
      };
    }

    return {
      message: 'OTP sent',
      otpCode: result.otpCode,
      otp: {
        length: env.otp.length,
        expirySeconds: env.otp.expirySeconds,
        resendDelaySeconds: env.otp.resendDelaySeconds,
        maxAttempts: env.otp.maxAttempts
      }
    };
  },

  async verifyOtp(payload: VerifyOtpInput): Promise<Record<string, unknown>> {
    const phoneNumber = normalizePhoneE164(payload.phoneNumber);
    const record = await otpRepository.findActiveOtp(phoneNumber, payload.purpose);

    if (!record) {
      throw new HttpError(401, 'OTP not found or expired');
    }

    if (record.attemptCount >= env.otp.maxAttempts) {
      await otpRepository.invalidateOtp(record.id);
      throw new HttpError(429, 'Maximum OTP attempts exceeded. Please request a new OTP');
    }

    const submittedOtpHash = otpService.hashOtp(payload.otpCode);
    if (submittedOtpHash !== record.otpCode) {
      const attemptCount = await otpRepository.incrementAttempts(record.id);
      const attemptsRemaining = Math.max(0, env.otp.maxAttempts - attemptCount);

      if (attemptsRemaining === 0) {
        await otpRepository.invalidateOtp(record.id);
        throw new HttpError(429, 'Maximum OTP attempts exceeded. Please request a new OTP');
      }

      throw new HttpError(401, `Invalid OTP code. ${attemptsRemaining} attempt(s) remaining`);
    }

    const user = await ensureUserForPurpose(phoneNumber, payload.purpose);
    await otpRepository.consumeOtp(record.id, user.id);

    if (payload.purpose === 'login') {
      await userRepository.updateLastLogin(user.id);
      const tokens = await tokenService.issueTokens(user.id, payload.deviceInfo);

      return {
        user: buildUserPayload(user),
        onboarding: user.isOnboarded,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      };
    }

    const passwordSetupToken = jwt.sign(
      { sub: user.id, typ: 'password_setup', purpose: payload.purpose },
      env.jwt.accessSecret,
      { expiresIn: `${env.otp.verifiedSessionMinutes}m` }
    );

    return {
      otpVerified: true,
      purpose: payload.purpose,
      requiresPasswordSetup: true,
      verificationWindowSeconds: env.otp.verifiedSessionMinutes * 60,
      passwordSetupToken
    };
  },

  async login(payload: LoginInput): Promise<Record<string, unknown>> {
    const phoneNumber = normalizePhoneE164(payload.phoneNumber);
    const user = await userRepository.findByPhone(phoneNumber);

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    if (!user.passwordHash) {
      throw new HttpError(401, 'Password not set for this account');
    }

    const isPasswordValid = verifyPassword(payload.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new HttpError(401, 'Invalid phone number or password');
    }

    await userRepository.updateLastLogin(user.id);
    const tokens = await tokenService.issueTokens(user.id, payload.deviceInfo);

    return {
      user: buildUserPayload(user),
      onboarding: user.isOnboarded,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  },

  async savePassword(
    userId: number,
    purpose: 'signup' | 'reset_password',
    payload: SavePasswordInput
  ): Promise<{ accountCreated: boolean; forgotSuccess: boolean }> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    const recentVerifiedOtp = await otpRepository.findLatestVerified(user.phoneNumber, purpose);
    if (!recentVerifiedOtp?.verifiedAt) {
      if (purpose === 'signup') {
        throw new HttpError(401, 'Signup OTP verification required');
      }

      throw new HttpError(401, 'Forgot-password OTP verification required');
    }

    const verifiedWithinMs = Date.now() - new Date(recentVerifiedOtp.verifiedAt).getTime();
    const allowedWindowMs = env.otp.verifiedSessionMinutes * 60 * 1000;
    if (verifiedWithinMs > allowedWindowMs) {
      throw new HttpError(401, 'OTP verification session expired');
    }

    const passwordHash = hashPassword(payload.password);
    await userRepository.setPassword(user.id, passwordHash);

    return {
      accountCreated: purpose === 'signup',
      forgotSuccess: purpose === 'reset_password'
    };
  },

  async refreshToken(
    refreshToken: string,
    deviceInfo?: Record<string, unknown>
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return tokenService.rotateRefreshToken(refreshToken, deviceInfo);
  },

  async logout(refreshToken: string): Promise<void> {
    await tokenService.revokeRefreshToken(refreshToken);
  }
};
