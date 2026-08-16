import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { SimulationService } from '../services/simulationService.js';

export const simulationFeedSchema = z.object({
  topicId: z
    .string()
    .trim()
    .min(1, 'topicId cannot be empty'),
  selectedContentFormats: z.array(z.string()).optional().default([]),
  selectedAttentionTypes: z.array(z.string()).optional().default([]),
});

export class SimulationController {
  /**
   * POST /api/simulation/feed
   * Generates a controlled, reproducible simulated information environment.
   */
  public static async generateFeed(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // 1. Validate request body with Zod
      const parseResult = simulationFeedSchema.safeParse(req.body);

      if (!parseResult.success) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid simulation parameters provided',
          errors: parseResult.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
        return;
      }

      // 2. Generate deterministic feed
      const result = await SimulationService.generateFeed(parseResult.data);

      res.status(200).json(result);
    } catch (error: any) {
      if (error.message && error.message.includes('not found')) {
        res.status(404).json({
          status: 'error',
          message: error.message,
        });
        return;
      }

      console.error('Error generating simulated feed:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to construct simulated feed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
}
