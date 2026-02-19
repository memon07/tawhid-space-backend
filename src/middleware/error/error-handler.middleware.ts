import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@utils/http-error';

export const errorHandlerMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message
      }
    });
    return;
  }

  const message = err instanceof Error ? err.message : 'Internal server error';

  res.status(500).json({
    success: false,
    error: {
      message
    }
  });
};
