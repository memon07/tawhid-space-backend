import { LogoutInput } from '@/types/auth';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

export const parseLogoutBody = (body: unknown): LogoutInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { refreshToken } = body;

  if (typeof refreshToken !== 'string' || refreshToken.trim().length === 0) {
    throw new HttpError(400, 'refreshToken is required');
  }

  return {
    refreshToken
  };
};
