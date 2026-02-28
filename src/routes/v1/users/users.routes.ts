import { Router } from 'express';
import { usersController } from '@controllers/users/users.controller';
import { requireAuth } from '@middleware/auth/require-auth.middleware';

const usersRouter = Router();

usersRouter.use(requireAuth);

usersRouter.get('/', usersController.list);
usersRouter.post('/onboarding', usersController.submitOnboarding);
usersRouter.get('/:id', usersController.getById);
usersRouter.patch('/:id', usersController.update);
usersRouter.patch('/:id/onboarding', usersController.updateOnboarding);
usersRouter.patch('/:id/active', usersController.updateActive);
usersRouter.delete('/:id', usersController.remove);

export { usersRouter };
