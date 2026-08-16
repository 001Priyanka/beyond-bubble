import mongoose from 'mongoose';
import { INITIAL_PERSPECTIVE_DETAILS } from '../data/seedPerspectives.js';
import { TopicService } from './topicService.js';
import { SimulationService } from './simulationService.js';
import type {
  PerspectiveDetail,
  SimulatedContentItem,
  Topic,
  GetPerspectivesResponse,
  GetPerspectiveDetailResponse,
  GetPerspectiveContentResponse,
} from '../../../shared/types.js';

export class PerspectiveService {
  /**
   * Normalize perspective name or slug for resilient matching.
   */
  private static normalizeId(val: string): string {
    return val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Retrieves all available perspectives for a topic.
   */
  public static async getPerspectivesByTopic(topicId: string): Promise<GetPerspectivesResponse> {
    const topic = await TopicService.getTopicById(topicId);
    if (!topic) {
      throw new Error(`Topic '${topicId}' not found`);
    }

    const perspectives = INITIAL_PERSPECTIVE_DETAILS.filter(
      (p) => p.topicId === topicId
    );

    return {
      topicId,
      perspectives: [...perspectives],
      total: perspectives.length,
    };
  }

  /**
   * Retrieves detailed controlled information for a specific perspective.
   */
  public static async getPerspectiveDetail(
    topicId: string,
    perspectiveIdentifier: string
  ): Promise<GetPerspectiveDetailResponse> {
    const topic = await TopicService.getTopicById(topicId);
    if (!topic) {
      throw new Error(`Topic '${topicId}' not found`);
    }

    const normalizedTarget = this.normalizeId(perspectiveIdentifier);

    const perspective = INITIAL_PERSPECTIVE_DETAILS.find(
      (p) =>
        p.topicId === topicId &&
        (p.id === perspectiveIdentifier ||
          this.normalizeId(p.id) === normalizedTarget ||
          this.normalizeId(p.name) === normalizedTarget ||
          p.name.toLowerCase() === perspectiveIdentifier.toLowerCase().trim())
    );

    if (!perspective) {
      throw new Error(
        `Perspective '${perspectiveIdentifier}' not found for topic '${topicId}'`
      );
    }

    return {
      perspective: { ...perspective },
      topic,
    };
  }

  /**
   * Retrieves representative simulated content items from MongoDB / controlled dataset
   * matching the selected topic and perspective.
   */
  public static async getPerspectiveContent(
    topicId: string,
    perspectiveIdentifier: string
  ): Promise<GetPerspectiveContentResponse> {
    const { perspective } = await this.getPerspectiveDetail(topicId, perspectiveIdentifier);
    const { items } = await SimulationService.getContentByTopic(topicId);

    const normalizedPerspectiveName = perspective.name.toLowerCase().trim();

    const matchingItems = items.filter(
      (item) =>
        item.perspective.toLowerCase().trim() === normalizedPerspectiveName ||
        this.normalizeId(item.perspective) === this.normalizeId(perspective.name)
    );

    return {
      topicId,
      perspective: perspective.name,
      items: matchingItems,
      total: matchingItems.length,
    };
  }
}
