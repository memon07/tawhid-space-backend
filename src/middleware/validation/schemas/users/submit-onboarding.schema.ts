import { SubmitOnboardingInput } from '@/types/user';
import { HttpError } from '@utils/http-error';
import { isRecord } from './common';

const isDateOnly = (value: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export const parseSubmitOnboardingBody = (body: unknown): SubmitOnboardingInput => {
  if (!isRecord(body)) {
    throw new HttpError(400, 'Invalid request body');
  }

  const { phoneNumber, preferredLanguage, fullName, birthDate, gender } = body;
  const age = body.age;

  if (typeof phoneNumber !== 'string' || phoneNumber.trim().length === 0) {
    throw new HttpError(400, 'phoneNumber is required');
  }

  if (typeof preferredLanguage !== 'string' || preferredLanguage.trim().length === 0) {
    throw new HttpError(400, 'preferredLanguage is required');
  }

  if (typeof fullName !== 'string' || fullName.trim().length === 0) {
    throw new HttpError(400, 'fullName is required');
  }

  if (birthDate !== undefined && (typeof birthDate !== 'string' || !isDateOnly(birthDate))) {
    throw new HttpError(400, 'birthDate must be in YYYY-MM-DD format');
  }

  if (age !== undefined && (typeof age !== 'number' || !Number.isInteger(age) || age <= 0 || age > 120)) {
    throw new HttpError(400, 'age must be an integer between 1 and 120');
  }

  if (birthDate === undefined && age === undefined) {
    throw new HttpError(400, 'birthDate or age is required');
  }

  if (typeof gender !== 'string' || gender.trim().length === 0) {
    throw new HttpError(400, 'gender is required');
  }

  return {
    phoneNumber,
    preferredLanguage,
    fullName,
    birthDate,
    age: typeof age === 'number' ? age : undefined,
    gender
  };
};
