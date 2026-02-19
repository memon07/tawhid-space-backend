import { env, isProduction } from '@config/env';
import { otpRepository } from '@repositories/otp.repository';
import { userRepository } from '@repositories/user.repository';
import { LoginInput, OtpPurpose, RequestOtpInput, SavePasswordInput, VerifyOtpInput } from '@/types/auth';
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

export const authService = {
  async requestOtp(payload: RequestOtpInput): Promise<{ message: string; otpCode?: string }> {
    const phoneNumber = normalizePhoneE164(payload.phoneNumber);
    const existingUser = await userRepository.findByPhone(phoneNumber);
    if (!existingUser && payload.purpose !== 'signup') {
      throw new HttpError(404, 'User not found for this phone number');
    }

    const result = await otpService.requestOtp(phoneNumber, payload.purpose, existingUser?.id);

    if (isProduction) {
      return { message: 'OTP sent' };
    }

    return {
      message: 'OTP sent',
      otpCode: result.otpCode
    };
  },

  async verifyOtp(payload: VerifyOtpInput): Promise<{ user: unknown; accessToken: string; refreshToken: string }> {
    const phoneNumber = normalizePhoneE164(payload.phoneNumber);
    const record = await otpRepository.findActiveOtp(phoneNumber, payload.purpose);

    if (!record) {
      throw new HttpError(401, 'OTP not found or expired');
    }

    if (record.attemptCount >= env.otp.maxAttempts) {
      throw new HttpError(429, 'Maximum OTP attempts exceeded');
    }

    const submittedOtpHash = otpService.hashOtp(payload.otpCode);
    if (submittedOtpHash !== record.otpCode) {
      await otpRepository.incrementAttempts(record.id);
      throw new HttpError(401, 'Invalid OTP code');
    }

    const user = await ensureUserForPurpose(phoneNumber, payload.purpose);
    await otpRepository.consumeOtp(record.id, user.id);
    await userRepository.updateLastLogin(user.id);

    const tokens = await tokenService.issueTokens(user.id, payload.deviceInfo);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  },

  async login(payload: LoginInput): Promise<{ user: unknown; accessToken: string; refreshToken: string }> {
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
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  },

  async savePassword(payload: SavePasswordInput): Promise<void> {
    const phoneNumber = normalizePhoneE164(payload.phoneNumber);
    const user = await userRepository.findByPhone(phoneNumber);
    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    const recentSignupOtp = await otpRepository.findLatestVerified(phoneNumber, 'signup');
    if (!recentSignupOtp?.verifiedAt) {
      throw new HttpError(401, 'Signup OTP verification required');
    }

    const verifiedWithinMs = Date.now() - new Date(recentSignupOtp.verifiedAt).getTime();
    const allowedWindowMs = env.otp.expiryMinutes * 60 * 1000;
    if (verifiedWithinMs > allowedWindowMs) {
      throw new HttpError(401, 'Signup session expired');
    }

    const passwordHash = hashPassword(payload.password);
    await userRepository.setPassword(user.id, passwordHash);
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
