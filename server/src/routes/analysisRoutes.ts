import { Router } from 'express';
import { AnalysisController } from '../controllers/analysisController.js';

export const analysisRouter = Router();

// POST /api/analysis
analysisRouter.post('/', AnalysisController.analyze);
