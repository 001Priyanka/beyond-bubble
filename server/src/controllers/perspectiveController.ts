import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { PerspectiveService } from '../services/perspectiveService.js';

export const topicParamSchema = z.object({
  topicId: z.string().trim().min(1, 'topicId is required'),
});

export const perspectiveParamSchema = z.object({
  topicId: z.string().trim().min(1, 'topicId is required'),
  perspective: z.string().trim().min(1, 'perspective identifier is required'),
});

export class PerspectiveController {
  /**
   * GET /api/perspectives/:topicId
   * Returns all available perspectives and metadata for a topic.
   */
  public static async getPerspectivesByTopic(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const parseResult = topicParamSchema.safeParse(req.params);
      if (!parseResult.success) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid topic parameter',
          errors: parseResult.error.issues.map((i) => i.message),
        });
        return;
      }

      const result = await PerspectiveService.getPerspectivesByTopic(
        parseResult.data.topicId
      );
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message && error.message.includes('not found')) {
        res.status(404).json({
          status: 'error',
          message: error.message,
        });
        return;
      }

      console.error('Error fetching perspectives by topic:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve perspectives',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  /**
   * GET /api/perspectives/:topicId/:perspective
   * Returns controlled detailed overview, themes, assumptions, and critical questions.
   */
  public static async getPerspectiveDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const parseResult = perspectiveParamSchema.safeParse(req.params);
      if (!parseResult.success) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid parameters',
          errors: parseResult.error.issues.map((i) => i.message),
        });
        return;
      }

      const result = await PerspectiveService.getPerspectiveDetail(
        parseResult.data.topicId,
        parseResult.data.perspective
      );
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message && error.message.includes('not found')) {
        res.status(404).json({
          status: 'error',
          message: error.message,
        });
        return;
      }

      console.error('Error fetching perspective detail:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve perspective detail',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  /**
   * GET /api/perspectives/:topicId/:perspective/content
   * Returns representative simulated content items from MongoDB / controlled dataset.
   */
  public static async getPerspectiveContent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const parseResult = perspectiveParamSchema.safeParse(req.params);
      if (!parseResult.success) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid parameters',
          errors: parseResult.error.issues.map((i) => i.message),
        });
        return;
      }

      const result = await PerspectiveService.getPerspectiveContent(
        parseResult.data.topicId,
        parseResult.data.perspective
      );
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message && error.message.includes('not found')) {
        res.status(404).json({
          status: 'error',
          message: error.message,
        });
        return;
      }

      console.error('Error fetching perspective content:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve representative content',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
}
