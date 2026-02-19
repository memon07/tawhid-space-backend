import { Router } from 'express';
import { authController } from '@controllers/auth/auth.controller';

const authRouter = Router();

authRouter.post('/otp/request', authController.requestOtp);
authRouter.post('/otp/verify', authController.verifyOtp);
authRouter.post('/request_otp', authController.requestOtp);
authRouter.post('/verify_otp', authController.verifyOtp);
authRouter.post('/login', authController.login);
authRouter.post('/save-password', authController.savePassword);
authRouter.post('/save_password', authController.savePassword);
authRouter.post('/token/refresh', authController.refreshToken);
authRouter.post('/logout', authController.logout);

export { authRouter };
