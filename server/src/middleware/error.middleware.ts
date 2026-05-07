import axios from 'axios';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: error.issues[0]?.message || 'Invalid request',
    });
    return;
  }

  if (axios.isAxiosError(error)) {
    if (error.config?.url?.includes('/api/generate')) {
      res.status(503).json({
        success: false,
        message: 'Ollama service unavailable or model failed to respond',
      });
      return;
    }

    res.status(422).json({
      success: false,
      message: 'Failed to fetch website',
    });
    return;
  }

  const message = error instanceof Error ? error.message : 'Unexpected server error';
  res.status(500).json({
    success: false,
    message,
  });
}

