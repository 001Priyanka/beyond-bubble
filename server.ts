import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createExpressApp } from './server/src/app.js';
import { connectDatabase } from './server/src/config/database.js';
import { env } from './server/src/config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer(): Promise<void> {
  const app = createExpressApp();
  const PORT = env.PORT || 3000;

  // Initialize database connection gracefully (won't crash if unconfigured/unavailable)
  await connectDatabase();

  // In development, hook Vite dev middleware
  if (env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built frontend from dist
    // dist/server.mjs is co-located inside dist/, so go one level up to find dist/
    const distPath = path.resolve(__dirname, '.');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Beyond the Bubble server running on http://0.0.0.0:${PORT}`);
    console.log(`🩺 Health check available at: http://localhost:${PORT}/api/health`);
  });
}

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
