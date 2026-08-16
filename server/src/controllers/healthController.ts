import { Request, Response } from 'express';
import { getDatabaseStatus } from '../config/database.js';
import { env } from '../config/env.js';

const startTime = Date.now();

export function getHealth(req: Request, res: Response): void {
  const dbStatus = getDatabaseStatus();
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  const isDegraded = dbStatus.state === 'disconnected' || dbStatus.state === 'unconfigured';

  res.status(200).json({
    status: isDegraded ? 'degraded' : 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds,
    environment: env.NODE_ENV,
    database: dbStatus,
    version: '0.1.0',
  });
}
