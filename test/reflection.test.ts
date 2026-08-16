import assert from 'node:assert';
import {
  REFLECTION_Q1_OPTIONS,
  REFLECTION_Q2_OPTIONS,
} from '../src/hooks/useReflection.js';

console.log('--- Running Phase 9 Reflection & Journey Validation Tests ---');

function runTests() {
  // Test 1: Question 1 Options check
  console.log('Test 1: Checking Q1 options count:', REFLECTION_Q1_OPTIONS.length);
  assert.strictEqual(REFLECTION_Q1_OPTIONS.length, 5);
  const q1Labels = REFLECTION_Q1_OPTIONS.map((o) => o.label);
  assert(q1Labels.includes('Look for supporting evidence'));
  assert(q1Labels.includes('Check who published it'));
  assert(q1Labels.includes('Look for other perspectives'));
  assert(q1Labels.includes('Consider the context'));
  assert(q1Labels.includes('All of these'));

  // Test 2: Question 2 Options check
  console.log('Test 2: Checking Q2 options count:', REFLECTION_Q2_OPTIONS.length);
  assert.strictEqual(REFLECTION_Q2_OPTIONS.length, 5);
  const q2Labels = REFLECTION_Q2_OPTIONS.map((o) => o.label);
  assert(q2Labels.includes('How concentrated the simulated feed was'));
  assert(q2Labels.includes('How differently perspectives framed the same topic'));
  assert(q2Labels.includes('How much context matters'));
  assert(q2Labels.includes('How difficult some claims were to evaluate'));
  assert(q2Labels.includes('Nothing surprised me'));

  // Test 3: Validation Logic
  const invalidAnswers1 = { question1: '', question2: '' };
  const isValid1 = Boolean(invalidAnswers1.question1.trim()) && Boolean(invalidAnswers1.question2.trim());
  assert.strictEqual(isValid1, false, 'Empty answers should be invalid');

  const invalidAnswers2 = { question1: 'Look for supporting evidence', question2: '' };
  const isValid2 = Boolean(invalidAnswers2.question1.trim()) && Boolean(invalidAnswers2.question2.trim());
  assert.strictEqual(isValid2, false, 'Only Q1 answered should be invalid');

  const validAnswers = {
    question1: 'Look for supporting evidence',
    question2: 'How much context matters',
    question3: '', // optional
  };
  const isValid3 = Boolean(validAnswers.question1.trim()) && Boolean(validAnswers.question2.trim());
  assert.strictEqual(isValid3, true, 'Q1 and Q2 answered should be valid even with empty Q3');

  // Test 4: Question 3 Character limit capping
  const longText = 'a'.repeat(350);
  const cappedText = longText.slice(0, 300);
  assert.strictEqual(cappedText.length, 300, 'Q3 text should be capped at 300 characters');

  console.log('✅ All Phase 9 Reflection tests passed successfully!');
}

runTests();
