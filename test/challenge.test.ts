import assert from 'node:assert';
import { ChallengeService } from '../server/src/services/challengeService.js';
import { INITIAL_CHALLENGES } from '../server/src/data/seedChallenges.js';

console.log('--- Running Phase 8 Media Literacy Challenge Tests ---');

async function runTests() {
  // Test 1: Retrieve challenges
  const challengesResponse = await ChallengeService.getChallenges();
  console.log('Test 1: Retrieved questions count:', challengesResponse.total);
  assert.strictEqual(challengesResponse.total, 4, 'Should contain exactly 4 challenge questions');
  assert.strictEqual(challengesResponse.challenges.length, 4);

  // Test 2: Check educational concepts
  const conceptIds = challengesResponse.challenges.map((c) => c.conceptId);
  console.log('Test 2: Concepts covered:', conceptIds);
  assert(conceptIds.includes('emotionalFraming'), 'Must cover Emotional Framing');
  assert(conceptIds.includes('opinionVsEvidence'), 'Must cover Opinion vs Evidence');
  assert(conceptIds.includes('sourceCredibility'), 'Must cover Source Credibility');
  assert(conceptIds.includes('missingContext'), 'Must cover Missing Context');

  // Test 3: Full 4/4 Perfect Score Submission
  const perfectAnswers = {
    'challenge-1-emotional-framing': 'a',
    'challenge-2-opinion-vs-evidence': 'b',
    'challenge-3-source-credibility': 'b',
    'challenge-4-missing-context': 'e',
  };

  const perfectResult = await ChallengeService.submitChallenge({ answers: perfectAnswers });
  console.log('Test 3: Perfect score result:', perfectResult.score, '% -', perfectResult.ratingLabel);
  assert.strictEqual(perfectResult.score, 100);
  assert.strictEqual(perfectResult.correctAnswersCount, 4);
  assert.strictEqual(perfectResult.ratingLabel, 'Master Signal Evaluator');
  assert.strictEqual(perfectResult.conceptsIdentified.length, 4);
  assert.strictEqual(perfectResult.conceptsToRevisit.length, 0);
  assert.strictEqual(perfectResult.conceptBreakdown.emotionalFraming, true);
  assert.strictEqual(perfectResult.conceptBreakdown.opinionVsEvidence, true);
  assert.strictEqual(perfectResult.conceptBreakdown.sourceCredibility, true);
  assert.strictEqual(perfectResult.conceptBreakdown.missingContext, true);

  // Test 4: 3/4 Score Submission (Missing Context incorrect)
  const partialAnswers = {
    'challenge-1-emotional-framing': 'a',
    'challenge-2-opinion-vs-evidence': 'b',
    'challenge-3-source-credibility': 'b',
    'challenge-4-missing-context': 'a', // incorrect (correct is 'e')
  };

  const partialResult = await ChallengeService.submitChallenge({ answers: partialAnswers });
  console.log('Test 4: Partial 3/4 score result:', partialResult.score, '% -', partialResult.ratingLabel);
  assert.strictEqual(partialResult.score, 75);
  assert.strictEqual(partialResult.correctAnswersCount, 3);
  assert.strictEqual(partialResult.ratingLabel, 'Strong Signal Detection');
  assert.strictEqual(partialResult.conceptsIdentified.length, 3);
  assert.strictEqual(partialResult.conceptsToRevisit.length, 1);
  assert.strictEqual(partialResult.conceptsToRevisit[0], 'Missing Context');
  assert.strictEqual(partialResult.conceptBreakdown.missingContext, false);

  // Test 5: Review breakdown accuracy
  assert.strictEqual(partialResult.reviews.length, 4);
  const q4Review = partialResult.reviews.find((r) => r.questionId === 'challenge-4-missing-context');
  assert(q4Review, 'Review for Q4 must exist');
  assert.strictEqual(q4Review.isCorrect, false);
  assert.strictEqual(q4Review.correctOptionId, 'e');
  assert.strictEqual(q4Review.selectedOptionId, 'a');
  assert(q4Review.explanation.includes('correlation or causation'));

  // Test 6: Habit prompt exists
  assert(partialResult.takeawayHabit.heading.includes('One useful habit'));
  assert(partialResult.takeawayHabit.prompt.includes('What would I need to know to verify this?'));

  console.log('✅ All Phase 8 Media Literacy Challenge tests passed successfully!');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
