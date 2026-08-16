import assert from 'node:assert';
import { calculateNormalizedEntropy, extractCounts } from '../server/src/utils/entropy.js';
import { AnalysisService } from '../server/src/services/analysisService.js';
import type { SimulatedContentItem } from '../shared/types.js';

console.log('--- Running Phase 6 Perspective Diversity Analysis Tests ---');

// Test 1: Even Distribution (Score = 100)
{
  const evenCounts = { A: 10, B: 10, C: 10, D: 10 };
  const result = calculateNormalizedEntropy(evenCounts);
  console.log('Test 1 (Even Distribution):', result.score);
  assert.strictEqual(result.categoryCount, 4);
  assert.strictEqual(result.totalItems, 40);
  assert.strictEqual(result.score, 100);
  assert.strictEqual(result.normalizedEntropy, 1);
}

// Test 2: Single Category (Score = 0)
{
  const singleCount = { 'AI Optimistic': 10 };
  const result = calculateNormalizedEntropy(singleCount);
  console.log('Test 2 (Single Category):', result.score);
  assert.strictEqual(result.score, 0);
  assert.strictEqual(result.categoryCount, 1);
  assert.strictEqual(result.totalItems, 10);
}

// Test 3: Empty Distribution (Score = 0)
{
  const emptyCounts = {};
  const result = calculateNormalizedEntropy(emptyCounts);
  console.log('Test 3 (Empty Distribution):', result.score);
  assert.strictEqual(result.score, 0);
  assert.strictEqual(result.categoryCount, 0);
  assert.strictEqual(result.totalItems, 0);
}

// Test 4: Concentrated Distribution (Skewed)
{
  // 6 in dominant, 2 in second, 1 in third, 1 in fourth (total 10 items)
  const skewedCounts = {
    'AI Optimistic': 6,
    'Worker Perspective': 2,
    Regulation: 1,
    'Academic / Research': 1,
  };
  const result = calculateNormalizedEntropy(skewedCounts);
  console.log('Test 4 (Concentrated Distribution):', result.score);
  assert(result.score > 0 && result.score < 100, 'Score should be between 0 and 100');
  assert(result.score < 85, 'Skewed distribution score should be lower than even distribution');
  assert.strictEqual(result.totalItems, 10);
  assert.strictEqual(result.categoryCount, 4);
}

// Test 5: Full Analysis Engine Service Evaluation
{
  const mockFeed: SimulatedContentItem[] = [
    {
      id: 'item-1',
      topicId: 'ai-and-jobs',
      headline: 'AI Enterprise Transformation',
      content: 'Productivity increases across major firms.',
      perspective: 'AI Optimistic',
      sourceType: 'Industry Journal',
      sourceName: 'Tech Frontier',
      framing: 'Economic Growth',
      tags: ['ai', 'growth'],
      isSimulated: true,
      format: 'news-articles',
      attentionType: 'data-research',
    },
    {
      id: 'item-2',
      topicId: 'ai-and-jobs',
      headline: 'Tech Innovation Booms',
      content: 'Venture investments reach historic peaks.',
      perspective: 'AI Optimistic',
      sourceType: 'Industry Journal',
      sourceName: 'Venture Insights',
      framing: 'Economic Growth',
      tags: ['ai', 'venture'],
      isSimulated: true,
      format: 'news-articles',
      attentionType: 'data-research',
    },
    {
      id: 'item-3',
      topicId: 'ai-and-jobs',
      headline: 'Autonomous Systems Expanding',
      content: 'Deployment accelerates in customer service.',
      perspective: 'AI Optimistic',
      sourceType: 'Industry Journal',
      sourceName: 'AI Quarterly',
      framing: 'Economic Growth',
      tags: ['automation'],
      isSimulated: true,
      format: 'news-articles',
      attentionType: 'data-research',
    },
    {
      id: 'item-4',
      topicId: 'ai-and-jobs',
      headline: 'Productivity Multipliers with LLMs',
      content: 'Knowledge workers report speedups.',
      perspective: 'AI Optimistic',
      sourceType: 'Mainstream Media',
      sourceName: 'Global News Daily',
      framing: 'Productivity Metrics',
      tags: ['work'],
      isSimulated: true,
      format: 'news-articles',
      attentionType: 'data-research',
    },
    {
      id: 'item-5',
      topicId: 'ai-and-jobs',
      headline: 'Displacement Concerns in Clerical Roles',
      content: 'Contract workers face shifting job requirements.',
      perspective: 'Worker Perspective',
      sourceType: 'Labor Forum',
      sourceName: 'Union Tribune',
      framing: 'Labor Displacement',
      tags: ['labor'],
      isSimulated: true,
      format: 'news-articles',
      attentionType: 'data-research',
    },
  ];

  const analysis = AnalysisService.analyzeFeed({
    simulationId: 'sim_test_1',
    feed: mockFeed,
  });

  console.log('Test 5 (Full Analysis Service):', {
    overallScore: analysis.overallScore,
    viewpointScore: analysis.viewpointScore,
    sourceScore: analysis.sourceScore,
    contentScore: analysis.contentScore,
    dominant: analysis.dominantPerspective,
    dominantPercentage: analysis.dominantPerspectivePercentage,
    underrepresented: analysis.underrepresentedPerspectives.map((u) => u.perspective),
    interpretation: analysis.interpretation.label,
  });

  assert.strictEqual(analysis.simulationId, 'sim_test_1');
  assert.strictEqual(analysis.dominantPerspective, 'AI Optimistic');
  assert.strictEqual(analysis.dominantPerspectivePercentage, 80);
  assert.strictEqual(analysis.itemCount, 5);
  assert(analysis.underrepresentedPerspectives.some((u) => u.perspective === 'Worker Perspective'));
  assert(analysis.overallScore >= 0 && analysis.overallScore <= 100);
}

// Test 6: Interpretation Thresholds
{
  assert.strictEqual(AnalysisService.getInterpretation(15).label, 'Highly concentrated');
  assert.strictEqual(AnalysisService.getInterpretation(35).label, 'Moderately concentrated');
  assert.strictEqual(AnalysisService.getInterpretation(60).label, 'Relatively diverse');
  assert.strictEqual(AnalysisService.getInterpretation(85).label, 'Highly diverse');
}

console.log('✅ ALL PERSPECTIVE DIVERSITY ANALYSIS TESTS PASSED SUCCESSFULLY!');
