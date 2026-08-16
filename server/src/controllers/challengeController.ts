import { Request, Response } from 'express';
import { z } from 'zod';
import { ChallengeService } from '../services/challengeService.js';

// Zod validation schemas
const submitChallengeSchema = z.object({
  answers: z.record(z.string(), z.string()).refine(
    (obj) => Object.keys(obj).length > 0,
    { message: 'At least one answer must be submitted.' }
  ),
  topicId: z.string().optional(),
  sessionToken: z.string().optional(),
});

/**
 * GET /api/challenges
 * Retrieves all media literacy challenge questions.
 */
export async function getChallengesHandler(_req: Request, res: Response): Promise<void> {
  try {
    const data = await ChallengeService.getChallenges();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getChallengesHandler:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve media literacy challenges',
        code: 'CHALLENGES_FETCH_ERROR',
      },
    });
  }
}

/**
 * POST /api/challenges/submit
 * Validates and scores user answers against the server truth.
 */
export async function submitChallengeHandler(req: Request, res: Response): Promise<void> {
  try {
    const validationResult = submitChallengeSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        error: {
          message: 'Invalid challenge submission payload',
          code: 'VALIDATION_ERROR',
          details: validationResult.error.issues,
        },
      });
      return;
    }

    const result = await ChallengeService.submitChallenge(validationResult.data);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in submitChallengeHandler:', error);
    res.status(500).json({
      error: {
        message: 'Failed to process challenge submission',
        code: 'SUBMISSION_PROCESSING_ERROR',
      },
    });
  }
}
