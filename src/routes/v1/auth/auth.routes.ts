import { Router } from 'express';
import { authController } from '@controllers/auth/auth.controller';
import { requirePasswordSetupToken } from '@middleware/auth/require-password-setup-token.middleware';

const authRouter = Router();

authRouter.post('/otp/request', authController.requestOtp);
authRouter.post('/otp/verify', authController.verifyOtp);
authRouter.post('/login', authController.login);
authRouter.post('/save-password', requirePasswordSetupToken, authController.savePassword);
authRouter.post('/token/refresh', authController.refreshToken);
authRouter.post('/logout', authController.logout);

export { authRouter };
