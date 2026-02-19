import { RequestOtpInput } from '@/types/auth';
import { HttpError } from '@utils/http-error';
import { allowedPurposes, isRecord } from './common';

export const parseRequestOtpBody = (body: unknown): RequestOtpInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { phoneNumber, purpose } = body;

  if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0) {
    throw new HttpError(400, 'phoneNumber is required');
  }

  if (typeof purpose !== 'string' || !allowedPurposes.includes(purpose as RequestOtpInput['purpose'])) {
    throw new HttpError(400, 'Invalid purpose');
  }

  return {
    phoneNumber,
    purpose: purpose as RequestOtpInput['purpose']
  };
};
