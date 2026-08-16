import type { ChallengeQuestion } from '../../../shared/types.js';

export const INITIAL_CHALLENGES: readonly ChallengeQuestion[] = [
  // =========================================================================
  // QUESTION 1 — EMOTIONAL FRAMING
  // =========================================================================
  {
    id: 'challenge-1-emotional-framing',
    order: 1,
    conceptId: 'emotionalFraming',
    conceptTitle: 'Emotional Framing',
    conceptBadge: 'Framing & Tone',
    question: 'Which observation best describes the framing in these headlines?',
    supportingMaterial: {
      type: 'headlines',
      headlineA: {
        label: 'Headline A',
        text: 'AI is finally freeing workers from boring jobs.',
      },
      headlineB: {
        label: 'Headline B',
        text: 'AI is destroying the future of human employment.',
      },
    },
    options: [
      {
        id: 'a',
        label: 'A',
        text: 'Both headlines use emotionally loaded language that can influence interpretation.',
      },
      {
        id: 'b',
        label: 'B',
        text: 'Only negative headlines use framing.',
      },
      {
        id: 'c',
        label: 'C',
        text: 'The first headline is objective because it sounds positive.',
      },
      {
        id: 'd',
        label: 'D',
        text: 'The second headline must be true because it sounds urgent.',
      },
    ],
    correctAnswer: 'a',
    explanation:
      "Both headlines use emotionally loaded terms such as 'freeing' and 'destroying'. Framing can influence how we interpret an issue before we examine the underlying evidence.",
    difficulty: 'beginner',
  },

  // =========================================================================
  // QUESTION 2 — OPINION VS EVIDENCE
  // =========================================================================
  {
    id: 'challenge-2-opinion-vs-evidence',
    order: 2,
    conceptId: 'opinionVsEvidence',
    conceptTitle: 'Opinion vs Evidence',
    conceptBadge: 'Claims & Verification',
    question: 'What should you do before accepting this claim?',
    supportingMaterial: {
      type: 'statement',
      statement: 'AI will definitely eliminate half of all jobs within the next decade.',
      attribution: 'Public Commentary',
    },
    options: [
      {
        id: 'a',
        label: 'A',
        text: 'Share it because it sounds important.',
      },
      {
        id: 'b',
        label: 'B',
        text: 'Look for the evidence, methodology and source behind the prediction.',
      },
      {
        id: 'c',
        label: 'C',
        text: 'Reject it because AI is usually beneficial.',
      },
      {
        id: 'd',
        label: 'D',
        text: 'Accept it because the statement sounds confident.',
      },
    ],
    correctAnswer: 'b',
    explanation:
      'Confidence is not evidence. Before accepting a prediction, examine who made it, what evidence supports it, how the estimate was produced, and whether credible sources offer different conclusions.',
    difficulty: 'beginner',
  },

  // =========================================================================
  // QUESTION 3 — SOURCE CREDIBILITY
  // =========================================================================
  {
    id: 'challenge-3-source-credibility',
    order: 3,
    conceptId: 'sourceCredibility',
    conceptTitle: 'Source Credibility',
    conceptBadge: 'Source Evaluation',
    question: 'Which source gives you more information to evaluate its claim?',
    supportingMaterial: {
      type: 'source-comparison',
      sourceA: {
        name: 'Anonymous viral post',
        tag: 'SOURCE A',
        points: [
          'No author identified',
          'No evidence provided',
          'Strong emotional language',
          'No links to supporting material',
        ],
      },
      sourceB: {
        name: 'Example Research Organization',
        tag: 'SOURCE B',
        points: [
          'Author identified',
          'Methodology described',
          'Evidence linked',
          'Research limitations discussed',
        ],
      },
    },
    options: [
      {
        id: 'a',
        label: 'A',
        text: 'Source A (Anonymous viral post)',
      },
      {
        id: 'b',
        label: 'B',
        text: 'Source B (Example Research Organization)',
      },
      {
        id: 'c',
        label: 'C',
        text: 'Neither source provides any basis for evaluation.',
      },
      {
        id: 'd',
        label: 'D',
        text: 'Both sources provide equal information.',
      },
    ],
    correctAnswer: 'b',
    explanation:
      'Source B provides more information that can be examined, including authorship, methodology and evidence. Those details help us evaluate a claim, but they do not automatically make the claim true.',
    difficulty: 'beginner',
  },

  // =========================================================================
  // QUESTION 4 — MISSING CONTEXT
  // =========================================================================
  {
    id: 'challenge-4-missing-context',
    order: 4,
    conceptId: 'missingContext',
    conceptTitle: 'Missing Context',
    conceptBadge: 'Contextual Evaluation',
    question: 'What information would you want before drawing a conclusion?',
    supportingMaterial: {
      type: 'study-claim',
      claim: 'A study found that people who use social media more frequently report lower wellbeing.',
      contextNote: 'Summarized research headline',
    },
    options: [
      {
        id: 'a',
        label: 'A',
        text: 'How the study was conducted.',
      },
      {
        id: 'b',
        label: 'B',
        text: 'How wellbeing was measured.',
      },
      {
        id: 'c',
        label: 'C',
        text: 'Whether the study establishes correlation or causation.',
      },
      {
        id: 'd',
        label: 'D',
        text: 'What population was studied.',
      },
      {
        id: 'e',
        label: 'E',
        text: 'All of the above.',
      },
    ],
    correctAnswer: 'e',
    explanation:
      'A claim can sound convincing while still requiring context. Before drawing a conclusion, examine the study design, measurement methods, population and whether the evidence shows correlation or causation.',
    difficulty: 'beginner',
  },
];
