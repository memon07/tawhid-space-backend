import { OtpPurpose } from '@/types/auth';

export const allowedPurposes: OtpPurpose[] = ['signup', 'login', 'reset_password'];

export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
