import mongoose from 'mongoose';
import { TopicModel } from '../models/Topic.js';
import { INITIAL_TOPICS } from '../../../shared/constants.js';
import type { Topic, GetTopicsResponse } from '../../../shared/types.js';

export class TopicService {
  /**
   * Retrieves all available exploration topics.
   * Leverages MongoDB if connected, and seamlessly falls back to defined standard seed topics.
   */
  public static async getTopics(): Promise<GetTopicsResponse> {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      return {
        topics: [...INITIAL_TOPICS],
        source: 'fallback',
        total: INITIAL_TOPICS.length,
      };
    }

    try {
      const dbTopics = await TopicModel.find().sort({ featured: -1, createdAt: 1 }).lean();

      if (dbTopics && dbTopics.length > 0) {
        const formattedTopics: Topic[] = dbTopics.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          description: doc.description,
          icon: doc.icon,
          tags: doc.tags || [],
          perspectiveCount: doc.perspectiveCount || 6,
          featured: doc.featured ?? true,
        }));

        return {
          topics: formattedTopics,
          source: 'database',
          total: formattedTopics.length,
        };
      }

      // If database collection is empty, seed initial topics into MongoDB
      console.log('🌱 Seeding initial exploration topics into MongoDB...');
      await TopicModel.insertMany(INITIAL_TOPICS as any);

      return {
        topics: [...INITIAL_TOPICS],
        source: 'database',
        total: INITIAL_TOPICS.length,
      };
    } catch (error) {
      console.warn('⚠️ Topic database query encountered an issue. Providing fallback topics:', error);
      return {
        topics: [...INITIAL_TOPICS],
        source: 'fallback',
        total: INITIAL_TOPICS.length,
      };
    }
  }

  /**
   * Retrieves a single topic by its ID.
   */
  public static async getTopicById(id: string): Promise<Topic | null> {
    const { topics } = await this.getTopics();
    return topics.find((t) => t.id === id) || null;
  }
}
