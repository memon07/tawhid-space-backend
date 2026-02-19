import { Op } from 'sequelize';
import { AccessToken } from '@models/index';

interface CreateAccessTokenParams {
  userId: number;
  tokenHash: string;
  deviceInfo?: Record<string, unknown>;
  expiresAt: Date;
}

export const accessTokenRepository = {
  async create(params: CreateAccessTokenParams): Promise<AccessToken> {
    return AccessToken.create({
      userId: params.userId,
      token: params.tokenHash,
      deviceInfo: params.deviceInfo ?? null,
      expiresAt: params.expiresAt,
      isRevoked: false
    });
  },

  async findValidByHash(tokenHash: string): Promise<AccessToken | null> {
    return AccessToken.findOne({
      where: {
        token: tokenHash,
        isRevoked: false,
        expiresAt: {
          [Op.gt]: new Date()
        }
      }
    });
  },

  async revoke(id: number): Promise<void> {
    await AccessToken.update({ isRevoked: true }, { where: { id } });
  },

  async revokeAllForUser(userId: number): Promise<void> {
    await AccessToken.update({ isRevoked: true }, { where: { userId } });
  }
};
