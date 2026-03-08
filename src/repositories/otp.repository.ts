import { Op } from 'sequelize';
import { OtpVerification } from '@models/index';
import { OtpPurpose } from '@/types/auth';

interface CreateOtpParams {
  userId?: number;
  phoneNumber: string;
  otpCodeHash: string;
  purpose: OtpPurpose;
  expiresAt: Date;
}

export const otpRepository = {
  async createOtp(params: CreateOtpParams): Promise<OtpVerification> {
    return OtpVerification.create({
      userId: params.userId ?? null,
      phoneNumber: params.phoneNumber,
      otpCode: params.otpCodeHash,
      purpose: params.purpose,
      expiresAt: params.expiresAt,
      attemptCount: 0,
      isUsed: false
    });
  },

  async findActiveOtp(phoneNumber: string, purpose: OtpPurpose): Promise<OtpVerification | null> {
    return OtpVerification.findOne({
      where: {
        phoneNumber,
        purpose,
        isUsed: false,
        expiresAt: {
          [Op.gt]: new Date()
        }
      },
      order: [['createdAt', 'DESC']]
    });
  },

  async findLatestVerified(phoneNumber: string, purpose: OtpPurpose): Promise<OtpVerification | null> {
    return OtpVerification.findOne({
      where: {
        phoneNumber,
        purpose,
        isUsed: true,
        verifiedAt: {
          [Op.ne]: null
        }
      },
      order: [['createdAt', 'DESC']]
    });
  },

  async findLatestVerifiedForPasswordSetup(phoneNumber: string): Promise<OtpVerification | null> {
    return OtpVerification.findOne({
      where: {
        phoneNumber,
        purpose: {
          [Op.in]: ['signup', 'reset_password']
        },
        isUsed: true,
        verifiedAt: {
          [Op.ne]: null
        }
      },
      order: [['createdAt', 'DESC']]
    });
  },

  async findLatestOtpByPhone(phoneNumber: string): Promise<OtpVerification | null> {
    return OtpVerification.findOne({
      where: { phoneNumber },
      order: [['createdAt', 'DESC']]
    });
  },

  async countByPhoneSince(phoneNumber: string, from: Date): Promise<number> {
    return OtpVerification.count({
      where: {
        phoneNumber,
        createdAt: {
          [Op.gte]: from
        }
      }
    });
  },

  async consumeOtp(id: number, userId?: number): Promise<void> {
    await OtpVerification.update(
      {
        ...(typeof userId === 'number' ? { userId } : {}),
        isUsed: true,
        verifiedAt: new Date()
      },
      { where: { id } }
    );
  },

  async incrementAttempts(id: number): Promise<number> {
    await OtpVerification.increment('attemptCount', { by: 1, where: { id } });
    const updated = await OtpVerification.findByPk(id);
    return updated?.attemptCount ?? 0;
  },

  async invalidateOtp(id: number): Promise<void> {
    await OtpVerification.update(
      {
        isUsed: true
      },
      { where: { id } }
    );
  }
};
