import { parseLoginBody } from '@/middleware/validation/schemas/auth/login.schema';
import { parseSavePasswordBody } from '@/middleware/validation/schemas/auth/save-password.schema';
import { parseVerifyOtpBody } from '@/middleware/validation/schemas/auth/verify-otp.schema';

describe('auth schema validation', () => {
  it('accepts password length between 8 and 12 on login', () => {
    const payload = parseLoginBody({
      phoneNumber: '+14155550123',
      password: '12345678'
    });

    expect(payload.password).toBe('12345678');
  });

  it('rejects login password length above 12', () => {
    expect(() =>
      parseLoginBody({
        phoneNumber: '+14155550123',
        password: '1234567890123'
      })
    ).toThrow('password must be between 8 and 12 characters');
  });

  it('accepts save-password with password only', () => {
    const payload = parseSavePasswordBody({
      password: '12345678'
    });

    expect(payload.password).toBe('12345678');
  });

  it('requires OTP to be exactly 6 digits', () => {
    expect(() =>
      parseVerifyOtpBody({
        phoneNumber: '+14155550123',
        otpCode: '12345',
        purpose: 'signup'
      })
    ).toThrow('otpCode must be a 6-digit numeric code');
  });
});
