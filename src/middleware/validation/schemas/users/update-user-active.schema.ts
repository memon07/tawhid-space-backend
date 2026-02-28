import { UpdateUserActiveInput } from '@/types/user';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

export const parseUpdateUserActiveBody = (body: unknown): UpdateUserActiveInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { isActive } = body;
  if (typeof isActive !== 'boolean') {
    throw new HttpError(400, 'isActive must be boolean');
  }

  return { isActive };
};
