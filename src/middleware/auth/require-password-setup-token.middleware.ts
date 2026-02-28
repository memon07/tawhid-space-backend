import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@config/env';
import { HttpError } from '@utils/http-error';

export interface PasswordSetupAuthContext {
  userId: number;
  purpose: 'signup' | 'reset_password';
}

export interface PasswordSetupAuthenticatedRequest extends Request {
  passwordSetup?: PasswordSetupAuthContext;
}

export const requirePasswordSetupToken = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError(401, 'Password setup token is required');
    }

    const token = authHeader.slice('Bearer '.length).trim();
    const decoded = jwt.verify(token, env.jwt.accessSecret);

    if (typeof decoded === 'string') {
      throw new HttpError(401, 'Invalid password setup token');
    }

    if (decoded.typ !== 'password_setup') {
      throw new HttpError(401, 'Invalid token type for password setup');
    }

    const userId = Number(decoded.sub);
    if (!userId || Number.isNaN(userId)) {
      throw new HttpError(401, 'Invalid token subject');
    }

    const purpose = decoded.purpose;
    if (purpose !== 'signup' && purpose !== 'reset_password') {
      throw new HttpError(401, 'Invalid password setup purpose');
    }

    (req as PasswordSetupAuthenticatedRequest).passwordSetup = { userId, purpose };
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }

    next(new HttpError(401, 'Invalid or expired password setup token'));
  }
};
