import { Router } from 'express';
import { authRouter } from './auth/auth.routes';
import { usersRouter } from './users/users.routes';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/users', usersRouter);

export { v1Router };
