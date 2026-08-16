import cors from 'cors';
import helmet from 'helmet';
import express, { Express } from 'express';

const isDev = process.env.NODE_ENV !== 'production';

export function configureSecurityMiddleware(app: Express): void {
  // Helmet security headers — disable CSP in development to allow Vite inline scripts
  app.use(
    helmet({
      contentSecurityPolicy: isDev ? false : undefined,
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS: allow all origins in development, restrict to same-origin in production
  app.use(
    cors({
      origin: isDev ? true : (process.env.APP_URL || false),
      credentials: true,
    })
  );

  // JSON Body parser with size limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
}
