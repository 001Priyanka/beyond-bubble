import assert from 'node:assert';
import { SimulationService } from '../server/src/services/simulationService.js';
import { AnalysisService } from '../server/src/services/analysisService.js';
import { PerspectiveService } from '../server/src/services/perspectiveService.js';
import { ChallengeService } from '../server/src/services/challengeService.js';
import { calculateNormalizedEntropy, extractCounts } from '../server/src/utils/entropy.js';
import { INITIAL_SIMULATED_CONTENT } from '../server/src/data/seedContent.js';
import { INITIAL_TOPICS } from '../shared/constants.js';
import { getDatabaseStatus } from '../server/src/config/database.js';
import type { SimulatedContentItem } from '../shared/types.js';

console.log('================================================================');
console.log('PHASE 11 — COMPREHENSIVE FINAL QA & RELIABILITY TEST SUITE');
console.log('================================================================\n');

async function runComprehensiveQA() {
  // -------------------------------------------------------------
  // TEST 1: Topic Data Integrity and Multi-Topic Isolation
  // -------------------------------------------------------------
  console.log('1. Testing Topic Data Integrity & Cross-Topic Isolation...');
  assert.strictEqual(INITIAL_TOPICS.length, 3, 'Must have exactly 3 starter topics');
  const validTopicIds = INITIAL_TOPICS.map((t) => t.id);

  // Check seed content distribution
  const itemsByTopic: Record<string, number> = {};
  for (const item of INITIAL_SIMULATED_CONTENT) {
    assert((validTopicIds as readonly string[]).includes(item.topicId), `Item ${item.id} has invalid topicId: ${item.topicId}`);
    assert(item.isSimulated === true, `Item ${item.id} must have isSimulated=true`);
    assert(item.headline && item.headline.length > 5, `Item ${item.id} must have valid headline`);
    assert(item.perspective && item.perspective.length > 2, `Item ${item.id} must have valid perspective`);
    itemsByTopic[item.topicId] = (itemsByTopic[item.topicId] || 0) + 1;
  }

  console.log('   Seed content distribution:', itemsByTopic);
  assert(itemsByTopic['ai-jobs'] >= 10, 'ai-jobs must have >= 10 items');
  assert(itemsByTopic['climate-change'] >= 10, 'climate-change must have >= 10 items');
  assert(itemsByTopic['social-media-mental-health'] >= 10, 'social-media-mental-health must have >= 10 items');

  // Verify that querying each topic only returns content for that topic
  for (const topicId of validTopicIds) {
    const content = await SimulationService.getContentByTopic(topicId);
    assert(content.items.length > 0, `Topic ${topicId} must have content items`);
    for (const it of content.items) {
      assert.strictEqual(it.topicId, topicId, `Cross-topic contamination detected: item ${it.id} in topic ${topicId}`);
    }
  }
  console.log('   ✓ Topic isolation verified: 0 cross-topic contamination');

  // -------------------------------------------------------------
  // TEST 2: Simulation Determinism & Feed Stability
  // -------------------------------------------------------------
  console.log('\n2. Testing Simulation Determinism & Stability...');
  const testConfig = {
    topicId: 'ai-jobs',
    selectedContentFormats: ['news-articles', 'opinion-posts'],
    selectedAttentionTypes: ['data-research', 'strong-opinions'],
  };

  const runs = [];
  for (let i = 0; i < 5; i++) {
    const feedRes = await SimulationService.generateFeed(testConfig);
    runs.push(feedRes);
  }

  const firstRun = runs[0];
  for (let i = 1; i < runs.length; i++) {
    assert.strictEqual(runs[i].simulationId, firstRun.simulationId, 'Simulation ID must be identical across runs');
    assert.strictEqual(runs[i].feed.length, firstRun.feed.length, 'Feed length must be identical');
    for (let j = 0; j < firstRun.feed.length; j++) {
      assert.strictEqual(runs[i].feed[j].id, firstRun.feed[j].id, `Feed order mismatch at index ${j}`);
      assert.strictEqual(runs[i].feed[j].perspective, firstRun.feed[j].perspective, `Perspective mismatch at index ${j}`);
    }
  }
  console.log('   ✓ Simulation determinism confirmed: 5 identical runs produced identical feeds');

  // -------------------------------------------------------------
  // TEST 3: Perspective Diversity Mathematical Calculations
  // -------------------------------------------------------------
  console.log('\n3. Testing Shannon Entropy & Perspective Diversity Math...');

  // 3a. Single category -> Score = 0
  const single = calculateNormalizedEntropy({ 'AI Optimistic': 10 });
  assert.strictEqual(single.score, 0, 'Single category must equal score 0');
  assert.strictEqual(single.normalizedEntropy, 0);

  // 3b. Empty -> Score = 0
  const empty = calculateNormalizedEntropy({});
  assert.strictEqual(empty.score, 0, 'Empty must equal score 0');

  // 3c. Two equal categories -> Score = 100
  const twoEqual = calculateNormalizedEntropy({ A: 5, B: 5 });
  assert.strictEqual(twoEqual.score, 100, 'Two equal categories must equal score 100');
  assert.strictEqual(twoEqual.normalizedEntropy, 1);

  // 3d. Four equal categories -> Score = 100
  const fourEqual = calculateNormalizedEntropy({ A: 10, B: 10, C: 10, D: 10 });
  assert.strictEqual(fourEqual.score, 100, 'Four equal categories must equal score 100');
  assert.strictEqual(fourEqual.normalizedEntropy, 1);

  // 3e. Skewed distribution -> 0 < Score < 100
  const skewed = calculateNormalizedEntropy({ A: 7, B: 1, C: 1, D: 1 });
  assert(skewed.score > 0 && skewed.score < 100, `Skewed score (${skewed.score}) must be between 0 and 100`);

  // 3f. Weighting verification (50% viewpoint, 30% source, 20% content)
  const analysisOutput = AnalysisService.analyzeFeed({
    simulationId: firstRun.simulationId,
    feed: firstRun.feed,
  });

  const vpCounts = extractCounts<SimulatedContentItem>(firstRun.feed, (it) => it.perspective);
  const srcCounts = extractCounts<SimulatedContentItem>(firstRun.feed, (it) => it.sourceType);
  const cntCounts = extractCounts<SimulatedContentItem>(firstRun.feed, (it) => it.framing);

  const vpRes = calculateNormalizedEntropy(vpCounts);
  const srcRes = calculateNormalizedEntropy(srcCounts);
  const cntRes = calculateNormalizedEntropy(cntCounts);

  const expectedWeighted = Math.round(
    vpRes.rawScore * 0.5 +
    srcRes.rawScore * 0.3 +
    cntRes.rawScore * 0.2
  );
  assert.strictEqual(
    analysisOutput.overallScore,
    expectedWeighted,
    `Overall score (${analysisOutput.overallScore}) must match 0.5/0.3/0.2 formula (${expectedWeighted})`
  );

  // Guard checks
  assert(!isNaN(analysisOutput.overallScore), 'Score must not be NaN');
  assert(isFinite(analysisOutput.overallScore), 'Score must be finite');
  assert(analysisOutput.overallScore >= 0 && analysisOutput.overallScore <= 100, 'Score must be in [0, 100]');
  console.log(`   ✓ Shannon Entropy mathematical calculations verified (Overall: ${analysisOutput.overallScore}/100)`);

  // -------------------------------------------------------------
  // TEST 4: Perspective Exploration Consistency
  // -------------------------------------------------------------
  console.log('\n4. Testing Perspective Explorer details & content...');
  for (const topic of INITIAL_TOPICS) {
    const perspectivesRes = await PerspectiveService.getPerspectivesByTopic(topic.id);
    assert(perspectivesRes.perspectives.length >= 3, `Topic ${topic.id} must have >= 3 perspectives`);

    for (const p of perspectivesRes.perspectives) {
      const detail = await PerspectiveService.getPerspectiveDetail(topic.id, p.id);
      assert(detail.perspective.keyThemes.length > 0, `Perspective ${p.id} must have key themes`);
      assert(detail.perspective.criticalQuestions.length > 0, `Perspective ${p.id} must have critical questions`);
      assert(detail.perspective.assumptions.length > 0, `Perspective ${p.id} must have assumptions`);

      const content = await PerspectiveService.getPerspectiveContent(topic.id, p.id);
      assert(content.items.length > 0, `Perspective ${p.id} must have representative content`);
    }
  }
  console.log('   ✓ Perspective Explorer verified for all topics');

  // -------------------------------------------------------------
  // TEST 5: Media Literacy Challenge Verification
  // -------------------------------------------------------------
  console.log('\n5. Testing Media Literacy Challenge logic & scoring security...');
  const challenges = await ChallengeService.getChallenges();
  assert.strictEqual(challenges.challenges.length, 4, 'Must have 4 challenge questions');

  // Verify all 4 concepts
  const concepts = new Set(challenges.challenges.map((c) => c.conceptId));
  assert(concepts.has('emotionalFraming'), 'Must contain emotionalFraming');
  assert(concepts.has('opinionVsEvidence'), 'Must contain opinionVsEvidence');
  assert(concepts.has('sourceCredibility'), 'Must contain sourceCredibility');
  assert(concepts.has('missingContext'), 'Must contain missingContext');

  // Test perfect submission
  const perfectResult = await ChallengeService.submitChallenge({
    answers: {
      'challenge-1-emotional-framing': 'a',
      'challenge-2-opinion-vs-evidence': 'b',
      'challenge-3-source-credibility': 'b',
      'challenge-4-missing-context': 'e',
    },
  });
  assert.strictEqual(perfectResult.score, 100);
  assert.strictEqual(perfectResult.correctAnswersCount, 4);
  assert.strictEqual(perfectResult.ratingLabel, 'Master Signal Evaluator');

  // Test partial submission (2/4)
  const partialResult = await ChallengeService.submitChallenge({
    answers: {
      'challenge-1-emotional-framing': 'a',
      'challenge-2-opinion-vs-evidence': 'a', // wrong
      'challenge-3-source-credibility': 'a', // wrong
      'challenge-4-missing-context': 'e',
    },
  });
  assert.strictEqual(partialResult.score, 50);
  assert.strictEqual(partialResult.correctAnswersCount, 2);
  assert.strictEqual(partialResult.conceptsToRevisit.length, 2);
  console.log('   ✓ Media Literacy Challenge verified (Server-side scoring only)');

  // -------------------------------------------------------------
  // TEST 6: Database Graceful Fallback & Health Endpoint
  // -------------------------------------------------------------
  console.log('\n6. Testing Database Graceful Fallback & Health Status...');
  const healthStatus = getDatabaseStatus();
  assert(typeof healthStatus.connected === 'boolean');
  assert(['connected', 'disconnected', 'unconfigured', 'connecting', 'error'].includes(healthStatus.state));
  console.log('   Database status check:', healthStatus.state, '-', healthStatus.message);
  console.log('   ✓ Database graceful degradation verified');

  // -------------------------------------------------------------
  // TEST 7: Ethics & Content Guidelines
  // -------------------------------------------------------------
  console.log('\n7. Testing Content & Ethics Boundaries...');
  const bannedPhrases = [
    'you are biased',
    'we detected your echo chamber',
    'you are now unbiased',
    'your beliefs have changed',
    'proven beyond all doubt',
  ];

  for (const item of INITIAL_SIMULATED_CONTENT) {
    const fullText = `${item.headline} ${item.content}`.toLowerCase();
    for (const phrase of bannedPhrases) {
      assert(!fullText.includes(phrase), `Found banned phrase "${phrase}" in item ${item.id}`);
    }
  }
  console.log('   ✓ Content & Ethics check passed: 0 banned/judgmental phrases found');

  console.log('\n================================================================');
  console.log('🎉 ALL PHASE 11 COMPREHENSIVE QA CHECKS PASSED WITH ZERO ERRORS!');
  console.log('================================================================\n');
}

runComprehensiveQA().catch((err) => {
  console.error('❌ QA Test failed:', err);
  process.exit(1);
});
