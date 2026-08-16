import cors from 'cors';
import helmet from 'helmet';
import express, { Express } from 'express';

export function configureSecurityMiddleware(app: Express): void {
  // Helmet headers for security (configured to allow Vite inline scripts in development)
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS setup
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  // JSON Body parser with size limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
}
