import { Router } from 'express';
import { getTopicsHandler } from '../controllers/topicController.js';

export const topicRouter = Router();

// GET /api/topics - List all available exploration topics
topicRouter.get('/', getTopicsHandler);
