import { SavePasswordInput } from '@/types/auth';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

export const parseSavePasswordBody = (body: unknown): SavePasswordInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { password } = body;

  if (typeof password !== 'string' || password.length < 8 || password.length > 12) {
    throw new HttpError(400, 'password must be between 8 and 12 characters');
  }

  return {
    password
  };
};
