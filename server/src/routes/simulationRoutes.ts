import { Router } from 'express';
import { SimulationController } from '../controllers/simulationController.js';

export const simulationRouter = Router();

// POST /api/simulation/feed
simulationRouter.post('/feed', SimulationController.generateFeed);
