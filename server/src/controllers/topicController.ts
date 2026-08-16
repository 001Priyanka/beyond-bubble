import { Request, Response } from 'express';
import { TopicService } from '../services/topicService.js';

export async function getTopicsHandler(_req: Request, res: Response): Promise<void> {
  try {
    const data = await TopicService.getTopics();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error handling getTopics:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve exploration topics',
        code: 'TOPICS_FETCH_ERROR',
      },
    });
  }
}
