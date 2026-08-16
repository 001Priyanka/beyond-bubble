import { Router } from 'express';
import { healthRouter } from './healthRoutes.js';
import { topicRouter } from './topicRoutes.js';
import { simulationRouter } from './simulationRoutes.js';
import { analysisRouter } from './analysisRoutes.js';
import { perspectiveRouter } from './perspectiveRoutes.js';
import { challengeRouter } from './challengeRoutes.js';

export const apiRouter = Router();

// Health Check Route
apiRouter.use('/', healthRouter);

// Topic Exploration Routes
apiRouter.use('/topics', topicRouter);

// Simulation Engine Routes
apiRouter.use('/simulation', simulationRouter);

// Analysis Engine Routes
apiRouter.use('/analysis', analysisRouter);

// Perspective Explorer Routes
apiRouter.use('/perspectives', perspectiveRouter);

// Media Literacy Challenge Routes
apiRouter.use('/challenges', challengeRouter);

