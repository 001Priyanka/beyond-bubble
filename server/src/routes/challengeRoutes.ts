import { Router } from 'express';
import {
  getChallengesHandler,
  submitChallengeHandler,
} from '../controllers/challengeController.js';

export const challengeRouter = Router();

// GET /api/challenges - Get all challenge questions
challengeRouter.get('/', getChallengesHandler);

// POST /api/challenges/submit - Submit answers and get authoritative score & feedback
challengeRouter.post('/submit', submitChallengeHandler);
