import mongoose from 'mongoose';
import crypto from 'crypto';
import { ContentModel } from '../models/Content.js';
import { TopicService } from './topicService.js';
import { INITIAL_SIMULATED_CONTENT } from '../data/seedContent.js';
import type {
  SimulatedContentItem,
  SimulationFeedRequest,
  SimulationFeedResponse,
  SimulationMetadata,
  DistributionMetric,
  Topic,
} from '../../../shared/types.js';

export class SimulationService {
  /**
   * Retrieves all simulated content for a given topic.
   * Leverages MongoDB if connected, else falls back to controlled seed dataset.
   */
  public static async getContentByTopic(topicId: string): Promise<{
    items: SimulatedContentItem[];
    source: 'database' | 'seed_repository';
  }> {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      const fallbackItems = INITIAL_SIMULATED_CONTENT.filter(
        (item) => item.topicId === topicId
      );
      return {
        items: [...fallbackItems],
        source: 'seed_repository',
      };
    }

    try {
      let dbItems = await ContentModel.find({ topicId } as any).lean();

      if (!dbItems || dbItems.length === 0) {
        // If collection is empty or topic not seeded yet, seed content
        console.log(`🌱 Seeding controlled simulated content for topic: ${topicId}...`);
        const topicSeedItems = INITIAL_SIMULATED_CONTENT.filter(
          (item) => item.topicId === topicId
        );
        if (topicSeedItems.length > 0) {
          await ContentModel.insertMany(topicSeedItems as any);
          dbItems = await ContentModel.find({ topicId } as any).lean();
        }
      }

      if (dbItems && dbItems.length > 0) {
        const formatted: SimulatedContentItem[] = dbItems.map((doc: any) => ({
          id: doc.id,
          topicId: doc.topicId,
          headline: doc.headline,
          content: doc.content,
          perspective: doc.perspective,
          sourceType: doc.sourceType,
          sourceName: doc.sourceName,
          framing: doc.framing,
          tags: doc.tags || [],
          isSimulated: true,
          format: doc.format || 'news-articles',
          attentionType: doc.attentionType || 'data-research',
          readingTimeMinutes: doc.readingTimeMinutes || 3,
          authorTitle: doc.authorTitle || 'Simulated Contributor',
          publishedDate: doc.publishedDate || '2026-06-01',
          engagementScore: doc.engagementScore || 85,
        }));

        return {
          items: formatted,
          source: 'database',
        };
      }

      // Fallback if still empty
      const fallbackItems = INITIAL_SIMULATED_CONTENT.filter(
        (item) => item.topicId === topicId
      );
      return {
        items: [...fallbackItems],
        source: 'seed_repository',
      };
    } catch (error) {
      console.warn('⚠️ Content query error, falling back to seed repository:', error);
      const fallbackItems = INITIAL_SIMULATED_CONTENT.filter(
        (item) => item.topicId === topicId
      );
      return {
        items: [...fallbackItems],
        source: 'seed_repository',
      };
    }
  }

  /**
   * Constructs a deterministic, controlled feed based on simulation configuration.
   * Target size: 10 items.
   * Balances topic perspective distribution with user preference weighting.
   */
  public static async generateFeed(
    params: SimulationFeedRequest
  ): Promise<SimulationFeedResponse> {
    const { topicId, selectedContentFormats = [], selectedAttentionTypes = [] } = params;

    // 1. Verify Topic exists
    const topic: Topic | null = await TopicService.getTopicById(topicId);
    if (!topic) {
      throw new Error(`Topic with id "${topicId}" was not found.`);
    }

    // 2. Fetch available content for topic
    const { items: allTopicItems, source } = await this.getContentByTopic(topicId);

    if (allTopicItems.length === 0) {
      throw new Error(`No simulated content available for topic "${topicId}".`);
    }

    // 3. Deterministic scoring & feed construction
    const feed = this.constructDeterministicFeed(
      allTopicItems,
      topicId,
      selectedContentFormats,
      selectedAttentionTypes
    );

    // 4. Calculate metadata distributions
    const metadata = this.calculateSimulationMetadata(
      topic,
      feed,
      source
    );

    // 5. Generate deterministic simulation ID
    const configHash = crypto
      .createHash('sha256')
      .update(
        `${topicId}-${selectedContentFormats.sort().join(',')}-${selectedAttentionTypes.sort().join(',')}`
      )
      .digest('hex')
      .substring(0, 12);

    const simulationId = `sim_${topicId}_${configHash}`;

    return {
      simulationId,
      topic,
      feed,
      simulationMetadata: metadata,
    };
  }

  /**
   * Deterministically selects exactly 10 items preserving perspective structure
   * while giving preference weight to user-selected formats and attention types.
   */
  private static constructDeterministicFeed(
    allItems: SimulatedContentItem[],
    topicId: string,
    selectedFormats: string[],
    selectedAttentionTypes: string[]
  ): SimulatedContentItem[] {
    const TARGET_FEED_SIZE = 10;

    // Group items by perspective
    const perspectiveGroups: Record<string, SimulatedContentItem[]> = {};
    allItems.forEach((item) => {
      if (!perspectiveGroups[item.perspective]) {
        perspectiveGroups[item.perspective] = [];
      }
      perspectiveGroups[item.perspective].push(item);
    });

    // Determine target perspective quota per topic to model information concentration
    // (e.g. AI & Jobs has a prominent AI Optimistic perspective ~60%)
    let targetQuotas: Record<string, number> = {};

    if (topicId === 'ai-jobs') {
      targetQuotas = {
        'AI Optimistic': 6,
        'Worker Perspective': 2,
        'Regulation': 1,
        'Academic / Research': 1,
      };
    } else if (topicId === 'climate-change') {
      targetQuotas = {
        'Clean Energy & Market Innovation': 5,
        'Climate Justice & Grassroots Action': 2,
        'Regulatory & Carbon Policy': 2,
        'Economic Transition & Energy Reliability': 1,
      };
    } else if (topicId === 'social-media-mental-health') {
      targetQuotas = {
        'Youth Vulnerability & Screen Risk': 5,
        'Community Connection & Empowerment': 2,
        'Algorithmic Transparency & Platform Reform': 2,
        'Digital Literacy & Individual Agency': 1,
      };
    } else {
      // Default even distribution for dynamic/custom topics
      const perspectives = Object.keys(perspectiveGroups);
      const perGroup = Math.floor(TARGET_FEED_SIZE / (perspectives.length || 1));
      perspectives.forEach((p) => {
        targetQuotas[p] = perGroup;
      });
    }

    // Score function for deterministic ranking inside each group
    const scoreItem = (item: SimulatedContentItem): number => {
      let score = 50; // base score

      // Format preference boost (+25)
      if (selectedFormats.length > 0 && selectedFormats.includes(item.format)) {
        score += 25;
      }

      // Attention type preference boost (+25)
      if (selectedAttentionTypes.length > 0 && selectedAttentionTypes.includes(item.attentionType)) {
        score += 25;
      }

      // Inherent engagement / quality score component
      score += (item.engagementScore || 80) * 0.1;

      return score;
    };

    // Deterministic tie breaker using stable hash
    const getHashScore = (item: SimulatedContentItem): number => {
      const str = `${item.id}-${topicId}-${selectedFormats.join('-')}-${selectedAttentionTypes.join('-')}`;
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash % 1000) / 1000;
    };

    const selectedFeed: SimulatedContentItem[] = [];
    const usedItemIds = new Set<string>();

    // Step 1: Select items according to perspective quotas
    for (const [perspective, quota] of Object.entries(targetQuotas)) {
      const candidates = (perspectiveGroups[perspective] || []).filter(
        (it) => !usedItemIds.has(it.id)
      );

      // Sort candidates deterministically by score descending, then hash tie-breaker
      candidates.sort((a, b) => {
        const scoreDiff = scoreItem(b) - scoreItem(a);
        if (Math.abs(scoreDiff) > 0.001) return scoreDiff;
        return getHashScore(b) - getHashScore(a);
      });

      const toPick = candidates.slice(0, quota);
      toPick.forEach((it) => {
        selectedFeed.push(it);
        usedItemIds.add(it.id);
      });
    }

    // Step 2: If we still need items (due to low inventory in some perspective), pick highest-scoring remaining
    if (selectedFeed.length < TARGET_FEED_SIZE) {
      const remainingCandidates = allItems.filter((it) => !usedItemIds.has(it.id));
      remainingCandidates.sort((a, b) => {
        const scoreDiff = scoreItem(b) - scoreItem(a);
        if (Math.abs(scoreDiff) > 0.001) return scoreDiff;
        return getHashScore(b) - getHashScore(a);
      });

      const needed = TARGET_FEED_SIZE - selectedFeed.length;
      const additional = remainingCandidates.slice(0, needed);
      additional.forEach((it) => {
        selectedFeed.push(it);
        usedItemIds.add(it.id);
      });
    }

    // Step 3: Deterministically arrange items for a natural editorial feed rhythm
    // Avoid putting all items of the same perspective consecutively while maintaining exact deterministic order
    return this.interleaveFeedDeterministically(selectedFeed, topicId);
  }

  /**
   * Arranges selected items into an editorial flow so the feed feels organic and realistic
   * while remaining 100% deterministic.
   */
  private static interleaveFeedDeterministically(
    items: SimulatedContentItem[],
    topicId: string
  ): SimulatedContentItem[] {
    // Separate by perspective
    const buckets: Record<string, SimulatedContentItem[]> = {};
    items.forEach((item) => {
      if (!buckets[item.perspective]) buckets[item.perspective] = [];
      buckets[item.perspective].push(item);
    });

    const result: SimulatedContentItem[] = [];
    const keys = Object.keys(buckets).sort(); // stable alphabetical sort

    let anyRemaining = true;
    let round = 0;

    while (anyRemaining) {
      anyRemaining = false;
      for (const k of keys) {
        if (buckets[k].length > 0) {
          result.push(buckets[k].shift()!);
          anyRemaining = true;
        }
      }
      round++;
      if (round > 20) break; // safety
    }

    return result;
  }

  /**
   * Computes distributions for perspectives, sources, formats, and framing.
   */
  private static calculateSimulationMetadata(
    topic: Topic,
    feed: SimulatedContentItem[],
    source: 'database' | 'seed_repository'
  ): SimulationMetadata {
    const total = feed.length;

    const countBy = (fn: (item: SimulatedContentItem) => string): Record<string, DistributionMetric> => {
      const counts: Record<string, number> = {};
      feed.forEach((item) => {
        const val = fn(item);
        counts[val] = (counts[val] || 0) + 1;
      });

      const result: Record<string, DistributionMetric> = {};
      Object.entries(counts).forEach(([key, count]) => {
        result[key] = {
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        };
      });
      return result;
    };

    return {
      isSimulated: true,
      topicId: topic.id,
      topicName: topic.name,
      contentCount: total,
      perspectiveDistribution: countBy((it) => it.perspective),
      sourceDistribution: countBy((it) => it.sourceName),
      formatDistribution: countBy((it) => String(it.format)),
      attentionDistribution: countBy((it) => String(it.attentionType)),
      generatedAt: new Date().toISOString(),
      source,
    };
  }
}
