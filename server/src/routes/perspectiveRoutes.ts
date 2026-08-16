import { Router } from 'express';
import { PerspectiveController } from '../controllers/perspectiveController.js';

export const perspectiveRouter = Router();

// GET /api/perspectives/:topicId - Returns available perspectives for a topic
perspectiveRouter.get('/:topicId', PerspectiveController.getPerspectivesByTopic);

// GET /api/perspectives/:topicId/:perspective/content - Returns representative simulated content
perspectiveRouter.get(
  '/:topicId/:perspective/content',
  PerspectiveController.getPerspectiveContent
);

// GET /api/perspectives/:topicId/:perspective - Returns controlled perspective information
perspectiveRouter.get(
  '/:topicId/:perspective',
  PerspectiveController.getPerspectiveDetail
);
