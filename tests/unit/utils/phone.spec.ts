import { normalizePhoneE164 } from '@/utils/phone';

describe('normalizePhoneE164', () => {
  it('normalizes numbers with plus sign', () => {
    expect(normalizePhoneE164('+8801712345678')).toBe('+8801712345678');
  });

  it('normalizes numbers without plus sign', () => {
    expect(normalizePhoneE164('8801712345678')).toBe('+8801712345678');
  });

  it('throws on invalid phone input', () => {
    expect(() => normalizePhoneE164('abc')).toThrow('Invalid phone number format');
  });
});
