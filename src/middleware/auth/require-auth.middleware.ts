import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@config/env';
import { HttpError } from '@utils/http-error';

export interface AuthContext {
  userId: number;
}

export interface AuthenticatedRequest extends Request {
  auth?: AuthContext;
}

export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError(401, 'Authorization token is required');
    }

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
      throw new HttpError(401, 'Authorization token is required');
    }

    const decoded = jwt.verify(token, env.jwt.accessSecret);
    if (typeof decoded === 'string') {
      throw new HttpError(401, 'Invalid access token');
    }

    if (decoded.typ !== 'access') {
      throw new HttpError(401, 'Invalid access token type');
    }

    const userId = Number(decoded.sub);
    if (!userId || Number.isNaN(userId)) {
      throw new HttpError(401, 'Invalid token subject');
    }

    (req as AuthenticatedRequest).auth = { userId };
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }
    next(new HttpError(401, 'Invalid or expired access token'));
  }
};
