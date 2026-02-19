import { RefreshTokenInput } from '@/types/auth';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

export const parseRefreshTokenBody = (body: unknown): RefreshTokenInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { refreshToken, deviceInfo } = body;

  if (typeof refreshToken !== 'string' || refreshToken.trim().length === 0) {
    throw new HttpError(400, 'refreshToken is required');
  }

  if (deviceInfo !== undefined && !isRecord(deviceInfo)) {
    throw new HttpError(400, 'deviceInfo must be an object');
  }

  return {
    refreshToken,
    deviceInfo
  };
};
