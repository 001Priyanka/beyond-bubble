import { useState, useCallback, useMemo } from 'react';
import type {
  ReflectionAnswers,
  ReflectionQuestionOption,
  SessionJourneySummary,
  SimulationFeedResponse,
  AnalysisResponse,
  ChallengeSubmissionResponse,
  Topic,
} from '../../shared/types.js';

export const REFLECTION_Q1_OPTIONS: ReflectionQuestionOption[] = [
  { id: 'evidence', label: 'Look for supporting evidence' },
  { id: 'source', label: 'Check who published it' },
  { id: 'perspectives', label: 'Look for other perspectives' },
  { id: 'context', label: 'Consider the context' },
  { id: 'all', label: 'All of these' },
];

export const REFLECTION_Q2_OPTIONS: ReflectionQuestionOption[] = [
  { id: 'concentrated', label: 'How concentrated the simulated feed was' },
  { id: 'framing', label: 'How differently perspectives framed the same topic' },
  { id: 'context-matters', label: 'How much context matters' },
  { id: 'evaluation-difficulty', label: 'How difficult some claims were to evaluate' },
  { id: 'nothing', label: 'Nothing surprised me' },
];

export interface UseReflectionParams {
  simulationData?: SimulationFeedResponse | null;
  analysisData?: AnalysisResponse | null;
  challengeResult?: ChallengeSubmissionResponse | null;
  topic?: Topic | null;
  exploredPerspectives?: any[];
}

export interface UseReflectionReturn {
  isCompleted: boolean;
  answers: ReflectionAnswers;
  isValid: boolean;
  summary: SessionJourneySummary;
  setQuestion1: (val: string) => void;
  setQuestion2: (val: string) => void;
  setQuestion3: (val: string) => void;
  completeReflection: () => void;
  retakeReflection: () => void;
}

export function useReflection({
  simulationData,
  analysisData,
  challengeResult,
  topic,
  exploredPerspectives = [],
}: UseReflectionParams): UseReflectionReturn {
  // Try retrieving cached reflection state from sessionStorage
  const [answers, setAnswers] = useState<ReflectionAnswers>(() => {
    try {
      const saved = sessionStorage.getItem('btb_reflection_answers');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      question1: '',
      question2: '',
      question3: '',
    };
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('btb_reflection_completed') === 'true';
    } catch {
      return false;
    }
  });

  // Validation: Q1 and Q2 are strictly required; Q3 is optional
  const isValid = useMemo(() => {
    return Boolean(answers.question1?.trim()) && Boolean(answers.question2?.trim());
  }, [answers.question1, answers.question2]);

  // Derive non-judgmental session metrics
  const summary: SessionJourneySummary = useMemo(() => {
    const topicName = topic?.name || simulationData?.topic?.name || 'Explored Topic';
    const topicId = topic?.id || simulationData?.topic?.id || 'ai-jobs';

    // Count unique perspective categories encountered in the feed items
    let encounteredCount = 4;
    if (Array.isArray(simulationData?.feed) && simulationData.feed.length > 0) {
      const uniquePerspectives = new Set(
        simulationData.feed.map((item) => item.perspective)
      );
      encounteredCount = Math.max(uniquePerspectives.size, 1);
    } else if (analysisData?.dominantPerspective) {
      encounteredCount = 4;
    }

    // Explored perspectives count
    const exploredCount = Math.max(exploredPerspectives?.length || 1, 1);

    // Challenge stats
    const challengeScore = challengeResult?.score ?? 100;
    const challengeCorrectCount = challengeResult?.correctAnswersCount ?? 4;
    const challengeTotalCount = challengeResult?.totalQuestions ?? 4;
    const diversityScore = analysisData?.overallScore;

    return {
      topicName,
      topicId,
      perspectivesEncountered: encounteredCount,
      perspectivesExplored: exploredCount,
      challengeScore,
      challengeCorrectCount,
      challengeTotalCount,
      diversityScore,
    };
  }, [topic, simulationData, analysisData, challengeResult, exploredPerspectives]);

  const setQuestion1 = useCallback((val: string) => {
    setAnswers((prev) => {
      const next = { ...prev, question1: val };
      try {
        sessionStorage.setItem('btb_reflection_answers', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setQuestion2 = useCallback((val: string) => {
    setAnswers((prev) => {
      const next = { ...prev, question2: val };
      try {
        sessionStorage.setItem('btb_reflection_answers', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setQuestion3 = useCallback((val: string) => {
    setAnswers((prev) => {
      const next = { ...prev, question3: val.slice(0, 300) };
      try {
        sessionStorage.setItem('btb_reflection_answers', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const completeReflection = useCallback(() => {
    if (!isValid) return;
    setIsCompleted(true);
    try {
      sessionStorage.setItem('btb_reflection_completed', 'true');
    } catch {
      // ignore
    }
  }, [isValid]);

  const retakeReflection = useCallback(() => {
    setIsCompleted(false);
    try {
      sessionStorage.setItem('btb_reflection_completed', 'false');
    } catch {
      // ignore
    }
  }, []);

  return {
    isCompleted,
    answers,
    isValid,
    summary,
    setQuestion1,
    setQuestion2,
    setQuestion3,
    completeReflection,
    retakeReflection,
  };
}
