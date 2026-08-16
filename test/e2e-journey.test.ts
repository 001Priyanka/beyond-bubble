import assert from 'node:assert';
import { SimulationService } from '../server/src/services/simulationService.js';
import { AnalysisService } from '../server/src/services/analysisService.js';
import { PerspectiveService } from '../server/src/services/perspectiveService.js';
import { ChallengeService } from '../server/src/services/challengeService.js';
import {
  REFLECTION_Q1_OPTIONS,
  REFLECTION_Q2_OPTIONS,
} from '../src/hooks/useReflection.js';
import { INITIAL_TOPICS } from '../shared/constants.js';

console.log('====================================================');
console.log('Running End-to-End Educational Journey Integration Test');
console.log('====================================================');

async function runEndToEndTests() {
  // 1. Topic Verification
  console.log('Step 1: Verifying topics...');
  assert.strictEqual(INITIAL_TOPICS.length, 3, 'Should have 3 starter topics');
  const topicIds = INITIAL_TOPICS.map((t) => t.id);
  assert(topicIds.includes('ai-jobs'));
  assert(topicIds.includes('climate-change'));
  assert(topicIds.includes('social-media-mental-health'));

  // 2. Simulation Feed Generation across all 3 topics
  console.log('Step 2: Testing feed simulation across all 3 topics...');
  for (const topic of INITIAL_TOPICS) {
    const feedResponse = await SimulationService.generateFeed({
      topicId: topic.id,
      selectedContentFormats: ['news-articles', 'opinion-posts'],
      selectedAttentionTypes: ['data-research'],
    });

    assert(feedResponse.feed.length > 0, `Topic ${topic.id} should generate feed items`);
    assert.strictEqual(feedResponse.topic.id, topic.id);
    assert(feedResponse.simulationMetadata.perspectiveDistribution);
    console.log(`  ✓ Topic "${topic.name}": generated ${feedResponse.feed.length} items`);

    // 3. Shannon Entropy Perspective Diversity Analysis
    console.log(`Step 3: Calculating Perspective Diversity Analysis for "${topic.name}"...`);
    const analysisResponse = await AnalysisService.analyzeFeed({
      simulationId: feedResponse.simulationId || 'sim-test',
      feed: feedResponse.feed,
    });

    assert(typeof analysisResponse.overallScore === 'number');
    assert(analysisResponse.overallScore >= 0 && analysisResponse.overallScore <= 100);
    assert(analysisResponse.dominantPerspective, 'Must identify dominant perspective');
    assert(analysisResponse.underrepresentedPerspectives.length > 0, 'Must identify missing viewpoints');
    console.log(
      `  ✓ Perspective Diversity Score: ${analysisResponse.overallScore}/100 (${analysisResponse.interpretation.label})`
    );

    // 4. Perspective Exploration
    console.log(`Step 4: Retrieving perspectives and representative content for "${topic.name}"...`);
    const perspectivesResponse = await PerspectiveService.getPerspectivesByTopic(topic.id);
    assert(perspectivesResponse.perspectives.length > 0, `Topic ${topic.id} should have perspective details`);
    console.log(`  ✓ Available viewpoints: ${perspectivesResponse.perspectives.length}`);
  }

  // 5. Media Literacy Challenge
  console.log('Step 5: Testing Media Literacy Challenge service...');
  const challenges = await ChallengeService.getChallenges();
  assert.strictEqual(challenges.challenges.length, 4);

  const submission = await ChallengeService.submitChallenge({
    answers: {
      'challenge-1-emotional-framing': 'a',
      'challenge-2-opinion-vs-evidence': 'b',
      'challenge-3-source-credibility': 'b',
      'challenge-4-missing-context': 'e',
    },
  });
  assert.strictEqual(submission.score, 100);
  assert.strictEqual(submission.correctAnswersCount, 4);
  console.log(`  ✓ Perfect score validation: ${submission.score}% (${submission.ratingLabel})`);

  // 6. Reflection Module & Habit Synthesis
  console.log('Step 6: Testing reflection validation and takeaways...');
  assert.strictEqual(REFLECTION_Q1_OPTIONS.length, 5);
  assert.strictEqual(REFLECTION_Q2_OPTIONS.length, 5);
  console.log('  ✓ Reflection options validated');

  console.log('\n====================================================');
  console.log('🎉 ALL END-TO-END JOURNEY TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================\n');
}

runEndToEndTests().catch((err) => {
  console.error('❌ E2E Journey test failed:', err);
  process.exit(1);
});
