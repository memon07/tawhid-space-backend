import { HttpError } from '@utils/http-error';

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const parsePositiveInteger = (value: unknown, field: string): number => {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    throw new HttpError(400, `${field} must be a positive integer`);
  }

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new HttpError(400, `${field} must be a positive integer`);
  }

  return parsed;
};

export const parseUserIdParam = (value: unknown): number => {
  return parsePositiveInteger(value, 'id');
};

export const parsePaginationValue = (
  value: unknown,
  field: 'page' | 'limit',
  defaultValue: number
): number => {
  if (value === undefined) {
    return defaultValue;
  }

  return parsePositiveInteger(value, field);
};
