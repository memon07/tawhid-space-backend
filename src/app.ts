import express from 'express';
import { apiRouter } from './routes';
import { errorHandlerMiddleware } from '@middleware/error/error-handler.middleware';
import { notFoundMiddleware } from '@middleware/error/not-found.middleware';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', apiRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export { app };
