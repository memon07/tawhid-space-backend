import { generateNumericOtp } from '@/services/auth/otp.service';

describe('generateNumericOtp', () => {
  it('creates numeric otp with requested length', () => {
    const otp = generateNumericOtp(6);

    expect(/^\d{6}$/.test(otp)).toBe(true);
  });
});
