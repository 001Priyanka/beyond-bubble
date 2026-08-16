/**
 * Normalized Shannon Entropy Calculation Utility
 * 
 * Mathematical Definition:
 * H = -sum(p_i * ln(p_i))  for all categories with p_i > 0
 * D = H / ln(n)            where n is the number of distinct categories represented (n > 1)
 * Score = D * 100
 * 
 * Edge Case Guarantees:
 * - Empty distribution -> 0
 * - Single category (n <= 1) -> 0
 * - Even distribution of n categories -> 100
 * - Zero occurrences are omitted
 * - NaN / Infinity / undefined guarded and clamped to [0, 100]
 */

export interface EntropyResult {
  score: number; // 0 to 100 (rounded to 1 decimal place or integer for presentation)
  rawScore: number; // unrounded [0, 100]
  rawEntropy: number; // H
  maxEntropy: number; // ln(n)
  normalizedEntropy: number; // D in [0, 1]
  categoryCount: number; // n
  totalItems: number; // N
  distribution: Record<string, number>; // proportions (sum to ~1.0)
  percentageDistribution: Record<string, number>; // percentages (sum to ~100)
}

/**
 * Calculates normalized Shannon entropy from an array of frequency counts or directly from item labels.
 */
export function calculateNormalizedEntropy(
  counts: Record<string, number> | number[]
): EntropyResult {
  // Normalize input counts map
  const countMap: Record<string, number> = {};

  if (Array.isArray(counts)) {
    counts.forEach((c, idx) => {
      if (c > 0) countMap[`category_${idx}`] = c;
    });
  } else {
    Object.entries(counts).forEach(([k, c]) => {
      if (typeof c === 'number' && c > 0 && isFinite(c)) {
        countMap[k] = c;
      }
    });
  }

  const entries = Object.entries(countMap);
  const n = entries.length;
  const total = entries.reduce((sum, [, c]) => sum + c, 0);

  // Safe baseline for empty or 1-category cases
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

  // Calculate probabilities p_i and Shannon entropy H
  let H = 0;
  const distribution: Record<string, number> = {};
  const percentageDistribution: Record<string, number> = {};

  for (const [key, count] of entries) {
    const p = count / total;
    if (p > 0) {
      H -= p * Math.log(p);
    }
    distribution[key] = Math.round(p * 1000) / 1000; // 3 decimal places (e.g. 0.600)
    percentageDistribution[key] = Math.round(p * 100); // whole percentage
  }

  // Theoretical maximum entropy: ln(n)
  const maxEntropy = Math.log(n);

  let normalizedEntropy = 0;
  if (maxEntropy > 0) {
    normalizedEntropy = H / maxEntropy;
  }

  // Guard against float precision drift (e.g. 1.0000000000000002)
  if (!isFinite(normalizedEntropy) || isNaN(normalizedEntropy) || normalizedEntropy < 0) {
    normalizedEntropy = 0;
  } else if (normalizedEntropy > 1) {
    normalizedEntropy = 1;
  }

  const rawScore = normalizedEntropy * 100;
  const score = Math.round(rawScore * 10) / 10; // 1 decimal place

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

/**
 * Convenience helper to count occurrences from a list of items using an extractor.
 */
export function extractCounts<T>(
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
