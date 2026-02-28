import { env } from '@/config/env';
import { otpRepository } from '@/repositories/otp.repository';
import { otpService } from '@/services/auth/otp.service';

jest.mock('@/repositories/otp.repository', () => ({
  otpRepository: {
    countByPhoneSince: jest.fn(),
    findLatestOtpByPhone: jest.fn(),
    createOtp: jest.fn()
  }
}));

const mockedOtpRepository = otpRepository as jest.Mocked<typeof otpRepository>;

describe('otpService.requestOtp rate limits', () => {
  const originalOtpConfig = { ...env.otp };

  beforeEach(() => {
    mockedOtpRepository.countByPhoneSince.mockReset();
    mockedOtpRepository.findLatestOtpByPhone.mockReset();
    mockedOtpRepository.createOtp.mockReset();

    env.otp.maxPerHour = 5;
    env.otp.resendDelaySeconds = 30;
    env.otp.length = 6;
    env.otp.expirySeconds = 90;
  });

  afterAll(() => {
    env.otp.expirySeconds = originalOtpConfig.expirySeconds;
    env.otp.length = originalOtpConfig.length;
    env.otp.maxAttempts = originalOtpConfig.maxAttempts;
    env.otp.resendDelaySeconds = originalOtpConfig.resendDelaySeconds;
    env.otp.maxPerHour = originalOtpConfig.maxPerHour;
    env.otp.verifiedSessionMinutes = originalOtpConfig.verifiedSessionMinutes;
  });

  it('rejects when hourly request cap is exceeded', async () => {
    mockedOtpRepository.countByPhoneSince.mockResolvedValue(5);

    await expect(otpService.requestOtp('+14155550123', 'signup')).rejects.toThrow(
      'Maximum OTP requests reached. Please try again later'
    );
  });

  it('rejects when resend is requested too early', async () => {
    mockedOtpRepository.countByPhoneSince.mockResolvedValue(1);
    mockedOtpRepository.findLatestOtpByPhone.mockResolvedValue({
      createdAt: new Date(Date.now() - 5 * 1000)
    } as never);

    await expect(otpService.requestOtp('+14155550123', 'signup')).rejects.toThrow(
      'Please wait'
    );
  });

  it('creates OTP when limits allow request', async () => {
    mockedOtpRepository.countByPhoneSince.mockResolvedValue(1);
    mockedOtpRepository.findLatestOtpByPhone.mockResolvedValue(null);

    await otpService.requestOtp('+14155550123', 'signup');

    expect(mockedOtpRepository.createOtp).toHaveBeenCalledTimes(1);
  });
});
