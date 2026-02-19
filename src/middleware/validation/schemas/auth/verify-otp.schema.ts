import { VerifyOtpInput } from '@/types/auth';
import { HttpError } from '@utils/http-error';
import { allowedPurposes, isRecord } from './common';

export const parseVerifyOtpBody = (body: unknown): VerifyOtpInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { phoneNumber, otpCode, purpose, deviceInfo } = body;

  if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0) {
    throw new HttpError(400, 'phoneNumber is required');
  }

  if (typeof otpCode !== 'string' || !/^\d{4,8}$/.test(otpCode)) {
    throw new HttpError(400, 'otpCode must be numeric');
  }

  if (typeof purpose !== 'string' || !allowedPurposes.includes(purpose as VerifyOtpInput['purpose'])) {
    throw new HttpError(400, 'Invalid purpose');
  }

  if (deviceInfo !== undefined && !isRecord(deviceInfo)) {
    throw new HttpError(400, 'deviceInfo must be an object');
  }

  return {
    phoneNumber,
    otpCode,
    purpose: purpose as VerifyOtpInput['purpose'],
    deviceInfo
  };
};
