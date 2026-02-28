import { UpdateUserInput } from '@/types/user';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

const isNullableString = (value: unknown): value is string | null => {
  return value === null || typeof value === 'string';
};

const isDateOnly = (value: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export const parseUpdateUserBody = (body: unknown): UpdateUserInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const payload: UpdateUserInput = {};

  if (Object.prototype.hasOwnProperty.call(body, 'phoneCountryCode')) {
    if (!isNullableString(body.phoneCountryCode)) {
      throw new HttpError(400, 'phoneCountryCode must be a string or null');
    }
    payload.phoneCountryCode = body.phoneCountryCode;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'fullName')) {
    if (!isNullableString(body.fullName)) {
      throw new HttpError(400, 'fullName must be a string or null');
    }
    payload.fullName = body.fullName;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'birthDate')) {
    if (!isNullableString(body.birthDate)) {
      throw new HttpError(400, 'birthDate must be a string in YYYY-MM-DD format or null');
    }
    if (typeof body.birthDate === 'string' && !isDateOnly(body.birthDate)) {
      throw new HttpError(400, 'birthDate must be a string in YYYY-MM-DD format or null');
    }
    payload.birthDate = body.birthDate;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'gender')) {
    if (!isNullableString(body.gender)) {
      throw new HttpError(400, 'gender must be a string or null');
    }
    payload.gender = body.gender;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'preferredLanguage')) {
    if (typeof body.preferredLanguage !== 'string' || body.preferredLanguage.trim().length === 0) {
      throw new HttpError(400, 'preferredLanguage must be a non-empty string');
    }
    payload.preferredLanguage = body.preferredLanguage;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'profileImageUrl')) {
    if (!isNullableString(body.profileImageUrl)) {
      throw new HttpError(400, 'profileImageUrl must be a string or null');
    }
    payload.profileImageUrl = body.profileImageUrl;
  }

  if (Object.keys(payload).length === 0) {
    throw new HttpError(400, 'At least one updatable field is required');
  }

  return payload;
};
