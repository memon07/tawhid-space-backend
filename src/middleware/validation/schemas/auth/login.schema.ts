import { LoginInput } from '@/types/auth';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

export const parseLoginBody = (body: unknown): LoginInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { phoneNumber, deviceInfo } = body;
  const password = body.password;

  if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0) {
    throw new HttpError(400, 'phoneNumber is required');
  }

  if (typeof password !== 'string' || password.length < 8) {
    throw new HttpError(400, 'password must be at least 8 characters');
  }

  if (deviceInfo !== undefined && !isRecord(deviceInfo)) {
    throw new HttpError(400, 'deviceInfo must be an object');
  }

  return {
    phoneNumber,
    password,
    deviceInfo
  };
};
