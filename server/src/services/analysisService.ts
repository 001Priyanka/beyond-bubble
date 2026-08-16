import {
  calculateNormalizedEntropy,
  extractCounts,
  EntropyResult,
} from '../utils/entropy.js';
import type {
  SimulatedContentItem,
  AnalysisRequest,
  AnalysisResponse,
  InterpretationDetails,
  UnderrepresentedPerspective,
  DiversityInterpretationLabel,
} from '../../../shared/types.js';

// Neutral, descriptive contextual notes for common simulated perspectives
const PERSPECTIVE_DESCRIPTIONS: Record<string, string> = {
  // AI & Jobs
  'AI Optimistic': 'Emphasizes productivity gains, technological advancement, and new job creation.',
  'Worker Perspective': 'Highlights labor displacement, deskilling risks, and workplace surveillance concerns.',
  'Regulation': 'Focuses on legislative guardrails, corporate severance standards, and compliance audits.',
  'Academic / Research': 'Analyzes empirical economic datasets, net employment models, and task-level diffusion.',

  // Climate Change
  'Clean Energy & Market Innovation': 'Focuses on capital deployment, cleantech scaling, and private-sector solutions.',
  'Climate Justice & Grassroots Action': 'Centers frontline communities, indigenous equity, and decentralized local resilience.',
  'Regulatory & Carbon Policy': 'Emphasizes emissions standards, carbon pricing, and international trade border adjustments.',
  'Economic Transition & Energy Reliability': 'Examines consumer electricity costs, baseload power security, and industrial transition friction.',

  // Social Media & Mental Health
  'Youth Vulnerability & Screen Risk': 'Focuses on developmental neuroscience, sleep disruption, and adolescent emotional health.',
  'Community Connection & Empowerment': 'Highlights peer support groups, marginalized community solidarity, and creative self-expression.',
  'Algorithmic Transparency & Platform Reform': 'Advocates for independent algorithmic audits, dark UX regulation, and behavioral safety defaults.',
  'Digital Literacy & Individual Agency': 'Promotes mindful device habits, notification boundaries, and individual digital literacy skills.',
};

export class AnalysisService {
  /**
   * Evaluates the Perspective Diversity Score and component dimensions of a simulated feed.
   * Deterministic, reproducible, and explainable using Normalized Shannon Entropy.
   */
  public static analyzeFeed(request: AnalysisRequest): AnalysisResponse {
    const { simulationId, feed = [] } = request;

    // Handle empty feed safely
    if (!feed || feed.length === 0) {
      return this.generateEmptyAnalysis(simulationId || 'sim_empty');
    }

    // 1. Viewpoint Diversity (50% weight) - Grouped by perspective
    const viewpointCounts = extractCounts(feed, (item) => item.perspective);
    const viewpointResult: EntropyResult = calculateNormalizedEntropy(viewpointCounts);

    // 2. Source Diversity (30% weight) - Grouped by sourceType
    const sourceCounts = extractCounts(feed, (item) => item.sourceType);
    const sourceResult: EntropyResult = calculateNormalizedEntropy(sourceCounts);

    // 3. Content Diversity (20% weight) - Grouped by framing
    const contentCounts = extractCounts(feed, (item) => item.framing);
    const contentResult: EntropyResult = calculateNormalizedEntropy(contentCounts);

    // 4. Calculate Overall Weighted Score (50% / 30% / 20%)
    const rawOverallScore =
      viewpointResult.rawScore * 0.5 +
      sourceResult.rawScore * 0.3 +
      contentResult.rawScore * 0.2;

    const overallScore = Math.round(rawOverallScore);

    // 5. Concentration Analysis (Dominant & Underrepresented Perspectives)
    const { dominantPerspective, dominantPerspectivePercentage, underrepresentedPerspectives } =
      this.analyzeConcentration(viewpointCounts, feed.length);

    // 6. Deterministic Interpretation
    const interpretation = this.getInterpretation(overallScore);

    return {
      simulationId: simulationId || `sim_${Date.now()}`,
      overallScore,
      viewpointScore: Math.round(viewpointResult.rawScore),
      sourceScore: Math.round(sourceResult.rawScore),
      contentScore: Math.round(contentResult.rawScore),
      perspectiveDistribution: viewpointResult.distribution,
      sourceDistribution: sourceResult.distribution,
      contentDistribution: contentResult.distribution,
      dominantPerspective,
      dominantPerspectivePercentage,
      underrepresentedPerspectives,
      interpretation,
      itemCount: feed.length,
      breakdown: {
        viewpoint: {
          score: Math.round(viewpointResult.rawScore),
          rawEntropy: viewpointResult.rawEntropy,
          maxEntropy: viewpointResult.maxEntropy,
          categoriesRepresented: viewpointResult.categoryCount,
          distribution: viewpointResult.distribution,
          percentageDistribution: viewpointResult.percentageDistribution,
        },
        source: {
          score: Math.round(sourceResult.rawScore),
          rawEntropy: sourceResult.rawEntropy,
          maxEntropy: sourceResult.maxEntropy,
          categoriesRepresented: sourceResult.categoryCount,
          distribution: sourceResult.distribution,
          percentageDistribution: sourceResult.percentageDistribution,
        },
        content: {
          score: Math.round(contentResult.rawScore),
          rawEntropy: contentResult.rawEntropy,
          maxEntropy: contentResult.maxEntropy,
          categoriesRepresented: contentResult.categoryCount,
          distribution: contentResult.distribution,
          percentageDistribution: contentResult.percentageDistribution,
        },
      },
      calculatedAt: new Date().toISOString(),
    };
  }

  /**
   * Identifies dominant and underrepresented perspectives using deterministic frequency thresholds.
   */
  private static analyzeConcentration(
    counts: Record<string, number>,
    total: number
  ): {
    dominantPerspective: string;
    dominantPerspectivePercentage: number;
    underrepresentedPerspectives: UnderrepresentedPerspective[];
  } {
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    if (entries.length === 0 || total === 0) {
      return {
        dominantPerspective: 'None',
        dominantPerspectivePercentage: 0,
        underrepresentedPerspectives: [],
      };
    }

    const [dominantName, dominantCount] = entries[0];
    const dominantPerspectivePercentage = Math.round((dominantCount / total) * 100);

    // Underrepresented: perspectives that have noticeably lower representation than the dominant
    // (e.g., proportion <= 20% or count <= dominantCount / 2)
    const underrepresentedPerspectives: UnderrepresentedPerspective[] = [];

    for (let i = 1; i < entries.length; i++) {
      const [pName, pCount] = entries[i];
      const pPercentage = Math.round((pCount / total) * 100);
      const pProportion = Math.round((pCount / total) * 1000) / 1000;

      // Include if it represents 25% or less, or has less than half the dominant count
      if (pPercentage <= 25 || pCount <= dominantCount / 2) {
        underrepresentedPerspectives.push({
          perspective: pName,
          count: pCount,
          proportion: pProportion,
          percentage: pPercentage,
          description:
            PERSPECTIVE_DESCRIPTIONS[pName] ||
            `Provides secondary domain focus and alternative contextual insights for this topic.`,
        });
      }
    }

    return {
      dominantPerspective: dominantName,
      dominantPerspectivePercentage,
      underrepresentedPerspectives,
    };
  }

  /**
   * Maps numerical diversity score to an educational, neutral interpretation.
   */
  public static getInterpretation(score: number): InterpretationDetails {
    const clampedScore = Math.max(0, Math.min(100, score));

    if (clampedScore < 25) {
      return {
        label: 'Highly concentrated',
        range: '0–24',
        summary:
          'Most of the simulated content came from one perspective, while alternative viewpoints appeared infrequently or not at all.',
        description:
          'This simulated feed demonstrated high viewpoint concentration, reflecting how algorithmic ranking can amplify a single narrative while marginalizing alternative considerations.',
      };
    }

    if (clampedScore < 50) {
      return {
        label: 'Moderately concentrated',
        range: '25–49',
        summary:
          'A primary viewpoint formed the majority of the simulated feed, with limited secondary perspectives present.',
        description:
          'While multiple viewpoints were present in the feed, exposure was noticeably weighted toward one dominant angle.',
      };
    }

    if (clampedScore < 75) {
      return {
        label: 'Relatively diverse',
        range: '50–74',
        summary:
          'The simulated feed balanced multiple viewpoints across several source categories and content framings.',
        description:
          'Content was distributed across several distinct perspectives, though some viewpoints still held a greater share of exposure than others.',
      };
    }

    return {
      label: 'Highly diverse',
      range: '75–100',
      summary:
        'The simulated feed achieved a balanced distribution across multiple perspectives, source types, and framings.',
      description:
        'Perspectives, source institutions, and content framings appeared with relatively equal weight throughout this simulated environment.',
    };
  }

  /**
   * Generates a safe fallback response for empty feeds.
   */
  private static generateEmptyAnalysis(simulationId: string): AnalysisResponse {
    return {
      simulationId,
      overallScore: 0,
      viewpointScore: 0,
      sourceScore: 0,
      contentScore: 0,
      perspectiveDistribution: {},
      sourceDistribution: {},
      contentDistribution: {},
      dominantPerspective: 'None',
      dominantPerspectivePercentage: 0,
      underrepresentedPerspectives: [],
      interpretation: {
        label: 'Highly concentrated',
        range: '0–24',
        summary: 'No content items were available to evaluate in this simulated feed.',
        description:
          'An empty feed provides no diversity of perspectives, source types, or framings.',
      },
      itemCount: 0,
      breakdown: {
        viewpoint: {
          score: 0,
          rawEntropy: 0,
          maxEntropy: 0,
          categoriesRepresented: 0,
          distribution: {},
          percentageDistribution: {},
        },
        source: {
          score: 0,
          rawEntropy: 0,
          maxEntropy: 0,
          categoriesRepresented: 0,
          distribution: {},
          percentageDistribution: {},
        },
        content: {
          score: 0,
          rawEntropy: 0,
          maxEntropy: 0,
          categoriesRepresented: 0,
          distribution: {},
          percentageDistribution: {},
        },
      },
      calculatedAt: new Date().toISOString(),
    };
  }
}
