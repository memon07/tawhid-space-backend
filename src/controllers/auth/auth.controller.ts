import { NextFunction, Request, Response } from 'express';
import { authService } from '@services/auth/auth.service';
import { parseLoginBody } from '@middleware/validation/schemas/auth/login.schema';
import { parseLogoutBody } from '@middleware/validation/schemas/auth/logout.schema';
import { parseRefreshTokenBody } from '@middleware/validation/schemas/auth/refresh-token.schema';
import { parseRequestOtpBody } from '@middleware/validation/schemas/auth/request-otp.schema';
import { parseSavePasswordBody } from '@middleware/validation/schemas/auth/save-password.schema';
import { parseVerifyOtpBody } from '@middleware/validation/schemas/auth/verify-otp.schema';

export const authController = {
  async requestOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = parseRequestOtpBody(req.body);
      const result = await authService.requestOtp(payload);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = parseVerifyOtpBody(req.body);
      const result = await authService.verifyOtp(payload);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = parseLoginBody(req.body);
      const result = await authService.login(payload);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async savePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = parseSavePasswordBody(req.body);
      await authService.savePassword(payload);
      res.status(200).json({ success: true, data: { message: 'Password saved' } });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = parseRefreshTokenBody(req.body);
      const result = await authService.refreshToken(payload.refreshToken, payload.deviceInfo);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = parseLogoutBody(req.body);
      await authService.logout(payload.refreshToken);
      res.status(200).json({ success: true, data: { message: 'Logged out' } });
    } catch (error) {
      next(error);
    }
  }
};
