import type {
  SimulatedContentItem,
  AnalysisRequest,
  AnalysisResponse,
  InterpretationDetails,
  UnderrepresentedPerspective,
} from '../../shared/types.js';

export interface ClientEntropyResult {
  score: number;
  rawScore: number;
  rawEntropy: number;
  maxEntropy: number;
  normalizedEntropy: number;
  categoryCount: number;
  totalItems: number;
  distribution: Record<string, number>;
  percentageDistribution: Record<string, number>;
}

export function computeNormalizedEntropy(
  counts: Record<string, number>
): ClientEntropyResult {
  const entries = Object.entries(counts).filter(
    ([, c]) => typeof c === 'number' && c > 0 && isFinite(c)
  );
  const n = entries.length;
  const total = entries.reduce((sum, [, c]) => sum + c, 0);

  if (total === 0 || n <= 1) {
    const singleDist: Record<string, number> = {};
    const singlePct: Record<string, number> = {};
    if (n === 1) {
      const [singleKey] = entries[0];
      singleDist[singleKey] = 1.0;
      singlePct[singleKey] = 100;
    }

    return {
      score: 0,
      rawScore: 0,
      rawEntropy: 0,
      maxEntropy: 0,
      normalizedEntropy: 0,
      categoryCount: n,
      totalItems: total,
      distribution: singleDist,
      percentageDistribution: singlePct,
    };
  }

  let H = 0;
  const distribution: Record<string, number> = {};
  const percentageDistribution: Record<string, number> = {};

  for (const [key, count] of entries) {
    const p = count / total;
    if (p > 0) {
      H -= p * Math.log(p);
    }
    distribution[key] = Math.round(p * 1000) / 1000;
    percentageDistribution[key] = Math.round(p * 100);
  }

  const maxEntropy = Math.log(n);
  let normalizedEntropy = maxEntropy > 0 ? H / maxEntropy : 0;

  if (!isFinite(normalizedEntropy) || isNaN(normalizedEntropy) || normalizedEntropy < 0) {
    normalizedEntropy = 0;
  } else if (normalizedEntropy > 1) {
    normalizedEntropy = 1;
  }

  const rawScore = normalizedEntropy * 100;
  const score = Math.round(rawScore * 10) / 10;

  return {
    score,
    rawScore,
    rawEntropy: Math.round(H * 10000) / 10000,
    maxEntropy: Math.round(maxEntropy * 10000) / 10000,
    normalizedEntropy: Math.round(normalizedEntropy * 10000) / 10000,
    categoryCount: n,
    totalItems: total,
    distribution,
    percentageDistribution,
  };
}

export function extractClientCounts<T>(
  items: T[],
  extractor: (item: T) => string | undefined | null
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const rawVal = extractor(item);
    const val = (rawVal || 'Unspecified').trim();
    if (val.length > 0) {
      counts[val] = (counts[val] || 0) + 1;
    }
  }
  return counts;
}

const PERSPECTIVE_DESCRIPTIONS: Record<string, string> = {
  'AI Optimistic': 'Emphasizes productivity gains, technological advancement, and new job creation.',
  'Worker Perspective': 'Highlights labor displacement, deskilling risks, and workplace surveillance concerns.',
  'Regulation': 'Focuses on legislative guardrails, corporate severance standards, and compliance audits.',
  'Academic / Research': 'Analyzes empirical economic datasets, net employment models, and task-level diffusion.',
  'Clean Energy & Market Innovation': 'Focuses on capital deployment, cleantech scaling, and private-sector solutions.',
  'Climate Justice & Grassroots Action': 'Centers frontline communities, indigenous equity, and decentralized local resilience.',
  'Regulatory & Carbon Policy': 'Emphasizes emissions standards, carbon pricing, and international trade border adjustments.',
  'Economic Transition & Energy Reliability': 'Examines consumer electricity costs, baseload power security, and industrial transition friction.',
  'Youth Vulnerability & Screen Risk': 'Focuses on developmental neuroscience, sleep disruption, and adolescent emotional health.',
  'Community Connection & Empowerment': 'Highlights peer support groups, marginalized community solidarity, and creative self-expression.',
  'Algorithmic Transparency & Platform Reform': 'Advocates for independent algorithmic audits, dark UX regulation, and behavioral safety defaults.',
  'Digital Literacy & Individual Agency': 'Promotes mindful device habits, notification boundaries, and individual digital literacy skills.',
};

export function computeClientAnalysis(request: AnalysisRequest): AnalysisResponse {
  const { simulationId, feed = [] } = request;

  if (!feed || feed.length === 0) {
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
        summary: 'No content items were available in this simulated environment.',
        description: 'An empty feed provides no diversity of viewpoints or sources.',
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

  const viewpointCounts = extractClientCounts(feed, (i) => i.perspective);
  const viewpointResult = computeNormalizedEntropy(viewpointCounts);

  const sourceCounts = extractClientCounts(feed, (i) => i.sourceType);
  const sourceResult = computeNormalizedEntropy(sourceCounts);

  const contentCounts = extractClientCounts(feed, (i) => i.framing);
  const contentResult = computeNormalizedEntropy(contentCounts);

  const rawOverall =
    viewpointResult.rawScore * 0.5 +
    sourceResult.rawScore * 0.3 +
    contentResult.rawScore * 0.2;
  const overallScore = Math.round(rawOverall);

  // Concentration
  const entries = Object.entries(viewpointCounts).sort((a, b) => b[1] - a[1]);
  const dominantName = entries.length > 0 ? entries[0][0] : 'None';
  const dominantCount = entries.length > 0 ? entries[0][1] : 0;
  const dominantPerspectivePercentage = Math.round((dominantCount / feed.length) * 100);

  const underrepresentedPerspectives: UnderrepresentedPerspective[] = [];
  for (let i = 1; i < entries.length; i++) {
    const [pName, pCount] = entries[i];
    const pPercentage = Math.round((pCount / feed.length) * 100);
    const pProportion = Math.round((pCount / feed.length) * 1000) / 1000;
    if (pPercentage <= 25 || pCount <= dominantCount / 2) {
      underrepresentedPerspectives.push({
        perspective: pName,
        count: pCount,
        proportion: pProportion,
        percentage: pPercentage,
        description:
          PERSPECTIVE_DESCRIPTIONS[pName] ||
          'Provides alternative contextual considerations and research framing.',
      });
    }
  }

  let interpretation: InterpretationDetails;
  if (overallScore < 25) {
    interpretation = {
      label: 'Highly concentrated',
      range: '0–24',
      summary:
        'Most of the simulated content came from one perspective, while several other perspectives appeared infrequently or not at all.',
      description:
        'This score indicates significant perspective concentration within the simulated feed environment.',
    };
  } else if (overallScore < 50) {
    interpretation = {
      label: 'Moderately concentrated',
      range: '25–49',
      summary:
        'A primary viewpoint formed the majority of the simulated feed, with limited secondary perspectives present.',
      description:
        'While multiple viewpoints were present in the feed, exposure was noticeably weighted toward one dominant angle.',
    };
  } else if (overallScore < 75) {
    interpretation = {
      label: 'Relatively diverse',
      range: '50–74',
      summary:
        'The simulated feed balanced multiple viewpoints across several source categories and content framings.',
      description:
        'Content was distributed across several distinct perspectives, though some viewpoints still held a greater share of exposure than others.',
    };
  } else {
    interpretation = {
      label: 'Highly diverse',
      range: '75–100',
      summary:
        'The simulated feed achieved a balanced distribution across multiple perspectives, source types, and framings.',
      description:
        'Perspectives, source institutions, and content framings appeared with relatively equal weight throughout this simulated environment.',
    };
  }

  return {
    simulationId,
    overallScore,
    viewpointScore: Math.round(viewpointResult.rawScore),
    sourceScore: Math.round(sourceResult.rawScore),
    contentScore: Math.round(contentResult.rawScore),
    perspectiveDistribution: viewpointResult.distribution,
    sourceDistribution: sourceResult.distribution,
    contentDistribution: contentResult.distribution,
    dominantPerspective: dominantName,
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
