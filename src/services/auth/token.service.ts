import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '@config/env';
import { accessTokenRepository } from '@repositories/access-token.repository';
import { sha256 } from '@utils/hash';
import { HttpError } from '@utils/http-error';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const parseDurationToSeconds = (duration: string): number => {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 24 * 60 * 60;
    default:
      throw new Error(`Unsupported duration unit: ${unit}`);
  }
};

export const tokenService = {
  async issueTokens(userId: number, deviceInfo?: Record<string, unknown>): Promise<TokenPair> {
    const accessExpiresIn = env.jwt.accessExpiresIn as jwt.SignOptions['expiresIn'];
    const refreshExpiresIn = env.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'];

    const accessToken = jwt.sign({ sub: userId, typ: 'access' }, env.jwt.accessSecret, {
      expiresIn: accessExpiresIn
    });

    const refreshToken = jwt.sign({ sub: userId, typ: 'refresh' }, env.jwt.refreshSecret, {
      expiresIn: refreshExpiresIn
    });

    const refreshTokenHash = sha256(refreshToken);
    const refreshTtlSeconds = parseDurationToSeconds(env.jwt.refreshExpiresIn);

    await accessTokenRepository.create({
      userId,
      tokenHash: refreshTokenHash,
      deviceInfo,
      expiresAt: new Date(Date.now() + refreshTtlSeconds * 1000)
    });

    return { accessToken, refreshToken };
  },

  verifyRefreshToken(refreshToken: string): JwtPayload {
    try {
      const decoded = jwt.verify(refreshToken, env.jwt.refreshSecret);
      if (typeof decoded === 'string') {
        throw new HttpError(401, 'Invalid token payload');
      }
      return decoded;
    } catch {
      throw new HttpError(401, 'Invalid or expired refresh token');
    }
  },

  async rotateRefreshToken(
    refreshToken: string,
    deviceInfo?: Record<string, unknown>
  ): Promise<TokenPair> {
    const decoded = this.verifyRefreshToken(refreshToken);
    const tokenHash = sha256(refreshToken);
    const existing = await accessTokenRepository.findValidByHash(tokenHash);

    if (!existing) {
      throw new HttpError(401, 'Refresh token is revoked or expired');
    }

    await accessTokenRepository.revoke(existing.id);

    const subject = Number(decoded.sub);
    if (!subject || Number.isNaN(subject)) {
      throw new HttpError(401, 'Invalid token subject');
    }

    return this.issueTokens(subject, deviceInfo);
  },

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    const tokenHash = sha256(refreshToken);
    const existing = await accessTokenRepository.findValidByHash(tokenHash);

    if (!existing) {
      return;
    }

    await accessTokenRepository.revoke(existing.id);
  }
};
