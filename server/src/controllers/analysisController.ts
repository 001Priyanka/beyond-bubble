import { Request, Response } from 'express';
import { z } from 'zod';
import { AnalysisService } from '../services/analysisService.js';

// Zod validation schema for feed items
export const simulatedContentItemSchema = z.object({
  id: z.string().optional().default(() => `item_${Date.now()}`),
  topicId: z.string().optional().default('custom'),
  headline: z.string().optional().default('Untitled Item'),
  content: z.string().optional().default(''),
  perspective: z.string().optional().default('Unspecified'),
  sourceType: z.string().optional().default('General Source'),
  sourceName: z.string().optional().default('Simulated Publication'),
  framing: z.string().optional().default('Standard Overview'),
  tags: z.array(z.string()).optional().default([]),
  isSimulated: z.boolean().optional().default(true),
  format: z.string().optional().default('news-articles'),
  attentionType: z.string().optional().default('data-research'),
  readingTimeMinutes: z.number().optional().default(3),
  authorTitle: z.string().optional().default('Simulated Contributor'),
  publishedDate: z.string().optional().default('2026-06-01'),
  engagementScore: z.number().optional().default(85),
});

export const analysisRequestSchema = z.object({
  simulationId: z.string().optional().default('sim_default'),
  feed: z.array(simulatedContentItemSchema).default([]),
});

export class AnalysisController {
  /**
   * POST /api/analysis
   * Analyzes the simulated information environment deterministic diversity metrics.
   */
  public static async analyze(req: Request, res: Response): Promise<void> {
    try {
      const parseResult = analysisRequestSchema.safeParse(req.body);

      if (!parseResult.success) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid feed analysis payload provided',
          errors: parseResult.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
        return;
      }

      const analysisResult = AnalysisService.analyzeFeed(parseResult.data as any);

      res.status(200).json(analysisResult);
    } catch (error: any) {
      console.error('Error analyzing simulated feed:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to compute perspective diversity analysis',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
}
