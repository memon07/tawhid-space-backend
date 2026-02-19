import { HttpError } from './http-error';

export const normalizePhoneE164 = (phoneNumber: string): string => {
  const normalized = phoneNumber.trim().replace(/[\s()-]/g, '');

  if (!/^\+?[1-9]\d{7,14}$/.test(normalized)) {
    throw new HttpError(400, 'Invalid phone number format');
  }

  return normalized.startsWith('+') ? normalized : `+${normalized}`;
};
