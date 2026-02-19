import { UpdateUserOnboardingInput } from '@/types/user';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

export const parseUpdateUserOnboardingBody = (body: unknown): UpdateUserOnboardingInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { isOnboarded } = body;
  if (typeof isOnboarded !== 'boolean') {
    throw new HttpError(400, 'isOnboarded must be boolean');
  }

  return { isOnboarded };
};
