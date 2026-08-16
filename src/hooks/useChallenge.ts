import { useState, useEffect, useCallback } from 'react';
import type {
  ChallengeQuestion,
  GetChallengesResponse,
  ChallengeSubmissionResponse,
} from '../../shared/types.js';

// Local fallback in case of offline or initial fetch delays
const FALLBACK_CHALLENGES: ChallengeQuestion[] = [
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

export type ChallengeStage = 'intro' | 'active' | 'results' | 'review';

export interface UseChallengeReturn {
  stage: ChallengeStage;
  questions: ChallengeQuestion[];
  currentIndex: number;
  currentQuestion: ChallengeQuestion | null;
  totalQuestions: number;
  userAnswers: Record<string, string>;
  selectedAnswer: string | null;
  isAnswerLocked: boolean;
  submissionResult: ChallengeSubmissionResponse | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  startChallenge: () => void;
  selectAnswer: (optionId: string) => void;
  nextQuestion: () => Promise<void>;
  goToQuestion: (index: number) => void;
  restartChallenge: () => void;
  viewReview: () => void;
  backToResults: () => void;
}

export function useChallenge(topicId?: string): UseChallengeReturn {
  const [stage, setStage] = useState<ChallengeStage>('intro');
  const [questions, setQuestions] = useState<ChallengeQuestion[]>(FALLBACK_CHALLENGES);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] =
    useState<ChallengeSubmissionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch challenge questions from server
  useEffect(() => {
    let isMounted = true;

    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/challenges');
        if (!res.ok) {
          throw new Error(`Failed to fetch challenge questions: ${res.statusText}`);
        }
        const data: GetChallengesResponse = await res.json();
        if (isMounted && data.challenges && data.challenges.length > 0) {
          setQuestions(data.challenges);
        }
      } catch (err) {
        console.warn('Could not load challenges from API, using fallback data:', err);
        // Fallback already initial state
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentQuestion = questions[currentIndex] || null;
  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] || null : null;
  const isAnswerLocked = currentAnswer !== null;

  const startChallenge = useCallback(() => {
    setStage('active');
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmissionResult(null);
  }, []);

  const selectAnswer = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return;
      // If already answered, lock to prevent double submission
      if (userAnswers[currentQuestion.id]) return;

      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }));
    },
    [currentQuestion, userAnswers]
  );

  const submitFinalAnswers = useCallback(
    async (finalAnswers: Record<string, string>) => {
      try {
        setSubmitting(true);
        setError(null);

        const response = await fetch('/api/challenges/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            answers: finalAnswers,
            topicId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server submission failed with status ${response.status}`);
        }

        const data: ChallengeSubmissionResponse = await response.json();
        setSubmissionResult(data);
        setStage('results');

        // Persist completion state in sessionStorage
        try {
          sessionStorage.setItem('btb_challenge_result', JSON.stringify(data));
        } catch {
          // ignore
        }
      } catch (err) {
        console.warn('Server validation failed, generating authoritative fallback result:', err);
        // Client-side fallback computation matching server logic in case of network disconnect
        let correctCount = 0;
        const conceptMap = {
          emotionalFraming: { title: 'Emotional Framing', correct: false },
          opinionVsEvidence: { title: 'Opinion vs Evidence', correct: false },
          sourceCredibility: { title: 'Source Credibility', correct: false },
          missingContext: { title: 'Missing Context', correct: false },
        };

        const reviews = questions.map((q) => {
          const selectedOptionId = (finalAnswers[q.id] || '').trim().toLowerCase();
          const isCorrect = selectedOptionId === q.correctAnswer.toLowerCase();
          if (isCorrect) {
            correctCount += 1;
            if (conceptMap[q.conceptId]) conceptMap[q.conceptId].correct = true;
          }
          const selOpt = q.options.find((o) => o.id.toLowerCase() === selectedOptionId);
          const corOpt = q.options.find((o) => o.id.toLowerCase() === q.correctAnswer.toLowerCase());

          return {
            questionId: q.id,
            order: q.order,
            conceptTitle: q.conceptTitle,
            conceptId: q.conceptId,
            question: q.question,
            selectedOptionId,
            correctOptionId: q.correctAnswer,
            isCorrect,
            selectedOptionText: selOpt ? selOpt.text : '',
            correctOptionText: corOpt ? corOpt.text : '',
            explanation: q.explanation,
            supportingMaterial: q.supportingMaterial,
          };
        });

        const score = Math.round((correctCount / questions.length) * 100);
        const ratingLabel =
          correctCount === 4
            ? 'Master Signal Evaluator'
            : correctCount === 3
              ? 'Strong Signal Detection'
              : correctCount === 2
                ? 'Developing Signal Awareness'
                : 'Foundational Signal Awareness';

        const conceptResults = Object.entries(conceptMap).map(([key, val]) => ({
          conceptId: key as any,
          conceptTitle: val.title,
          identified: val.correct,
        }));

        const fallbackResult: ChallengeSubmissionResponse = {
          score,
          totalQuestions: questions.length,
          correctAnswersCount: correctCount,
          ratingLabel,
          conceptBreakdown: {
            emotionalFraming: conceptMap.emotionalFraming.correct,
            opinionVsEvidence: conceptMap.opinionVsEvidence.correct,
            sourceCredibility: conceptMap.sourceCredibility.correct,
            missingContext: conceptMap.missingContext.correct,
          },
          conceptResults,
          conceptsIdentified: conceptResults.filter((c) => c.identified).map((c) => c.conceptTitle),
          conceptsToRevisit: conceptResults.filter((c) => !c.identified).map((c) => c.conceptTitle),
          reviews,
          takeawayHabit: {
            heading: 'One useful habit to take with you:',
            habit: 'Before sharing a claim, ask:',
            prompt: 'What would I need to know to verify this?',
          },
          submittedAt: new Date().toISOString(),
        };

        setSubmissionResult(fallbackResult);
        setStage('results');
      } finally {
        setSubmitting(false);
      }
    },
    [questions, topicId]
  );

  const nextQuestion = useCallback(async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Reached end of challenge, submit all answers
      await submitFinalAnswers(userAnswers);
    }
  }, [currentIndex, questions.length, userAnswers, submitFinalAnswers]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index);
      }
    },
    [questions.length]
  );

  const restartChallenge = useCallback(() => {
    setStage('intro');
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmissionResult(null);
  }, []);

  const viewReview = useCallback(() => {
    setStage('review');
  }, []);

  const backToResults = useCallback(() => {
    setStage('results');
  }, []);

  return {
    stage,
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions: questions.length,
    userAnswers,
    selectedAnswer: currentAnswer,
    isAnswerLocked,
    submissionResult,
    loading,
    submitting,
    error,
    startChallenge,
    selectAnswer,
    nextQuestion,
    goToQuestion,
    restartChallenge,
    viewReview,
    backToResults,
  };
}
