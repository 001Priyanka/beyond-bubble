import express, { Express } from 'express';
import { configureSecurityMiddleware } from './middleware/security.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRouter } from './routes/api.js';

export function createExpressApp(): Express {
  const app = express();

  // Configure security headers, CORS, and request body limits
  configureSecurityMiddleware(app);

  // Mount API router at /api prefix
  app.use('/api', apiRouter);

  // Global Error Handler for API routes
  app.use(errorHandler);

  return app;
}
