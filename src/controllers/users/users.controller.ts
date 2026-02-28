import { NextFunction, Request, Response } from 'express';
import { usersService } from '@services/users/users.service';
import { parseUserIdParam } from '@middleware/validation/schemas/users/common';
import { parseListUsersQuery } from '@middleware/validation/schemas/users/list-users.schema';
import { parseUpdateUserBody } from '@middleware/validation/schemas/users/update-user.schema';
import { parseUpdateUserOnboardingBody } from '@middleware/validation/schemas/users/update-user-onboarding.schema';
import { parseUpdateUserActiveBody } from '@middleware/validation/schemas/users/update-user-active.schema';
import { parseSubmitOnboardingBody } from '@middleware/validation/schemas/users/submit-onboarding.schema';
import { AuthenticatedRequest } from '@middleware/auth/require-auth.middleware';
import { HttpError } from '@utils/http-error';

export const usersController = {
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = parseListUsersQuery(req.query);
      const result = await usersService.listUsers(query.page, query.limit);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = parseUserIdParam(req.params.id);
      const result = await usersService.getUserById(userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = parseUserIdParam(req.params.id);
      const payload = parseUpdateUserBody(req.body);
      const result = await usersService.updateUser(userId, payload);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async updateOnboarding(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = parseUserIdParam(req.params.id);
      const payload = parseUpdateUserOnboardingBody(req.body);
      const result = await usersService.updateOnboarding(userId, payload);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async updateActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = parseUserIdParam(req.params.id);
      const payload = parseUpdateUserActiveBody(req.body);
      const result = await usersService.updateActive(userId, payload);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = parseUserIdParam(req.params.id);
      await usersService.deleteUser(userId);
      res.status(200).json({ success: true, data: { message: 'User deleted' } });
    } catch (error) {
      next(error);
    }
  },

  async submitOnboarding(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.auth?.userId;
      if (!userId) {
        throw new HttpError(401, 'Unauthorized');
      }
      const payload = parseSubmitOnboardingBody(req.body);
      const result = await usersService.submitOnboarding(userId, payload);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
};
