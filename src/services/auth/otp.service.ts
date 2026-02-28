import { env, isProduction } from '@config/env';
import { otpRepository } from '@repositories/otp.repository';
import { OtpPurpose } from '@/types/auth';
import { sha256 } from '@utils/hash';
import { HttpError } from '@utils/http-error';

export const generateNumericOtp = (length: number): string => {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return `${Math.floor(Math.random() * (max - min + 1)) + min}`;
};

export const otpService = {
  async requestOtp(
    phoneNumber: string,
    purpose: OtpPurpose,
    userId?: number
  ): Promise<{ otpCode?: string }> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const hourlyOtpCount = await otpRepository.countByPhoneSince(phoneNumber, oneHourAgo);
    if (hourlyOtpCount >= env.otp.maxPerHour) {
      throw new HttpError(429, 'Maximum OTP requests reached. Please try again later');
    }

    const latestOtp = await otpRepository.findLatestOtpByPhone(phoneNumber);
    if (latestOtp) {
      const minNextRequestAt =
        new Date(latestOtp.createdAt).getTime() + env.otp.resendDelaySeconds * 1000;
      const now = Date.now();
      if (minNextRequestAt > now) {
        const retryAfterSeconds = Math.ceil((minNextRequestAt - now) / 1000);
        throw new HttpError(429, `Please wait ${retryAfterSeconds} seconds before requesting a new OTP`);
      }
    }

    const otpCode = generateNumericOtp(env.otp.length);
    const otpCodeHash = sha256(otpCode);
    const expiresAt = new Date(Date.now() + env.otp.expirySeconds * 1000);

    await otpRepository.createOtp({
      userId,
      phoneNumber,
      purpose,
      otpCodeHash,
      expiresAt
    });

    // Stub sender for phase-1. Replace with real SMS provider later.
    if (!isProduction) {
      console.log(`[OTP-STUB] phone=${phoneNumber} purpose=${purpose} otp=${otpCode}`);
      return { otpCode };
    }

    console.log(`[OTP-STUB] phone=${phoneNumber} purpose=${purpose} otp=hidden`);
    return {};
  },

  hashOtp(rawOtp: string): string {
    return sha256(rawOtp);
  }
};
