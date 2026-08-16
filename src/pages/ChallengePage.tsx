import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Sparkles, AlertCircle, Compass } from 'lucide-react';
import { JourneyProgress } from '../components/layout/JourneyProgress.js';
import { useChallenge } from '../hooks/useChallenge.js';
import { ChallengeIntro } from '../components/challenge/ChallengeIntro.js';
import { ChallengeProgress } from '../components/challenge/ChallengeProgress.js';
import { ChallengeQuestionCard } from '../components/challenge/ChallengeQuestionCard.js';
import { ChallengeResults } from '../components/challenge/ChallengeResults.js';
import { ChallengeReviewView } from '../components/challenge/ChallengeReviewView.js';
import { ROUTES } from '../../shared/constants.js';
import type { SimulationFeedResponse, AnalysisResponse, Topic } from '../../shared/types.js';

export default function ChallengePage(): React.JSX.Element {
  const location = useLocation();

  // 1. Recover simulation, analysis, and topic context from routing state or sessionStorage
  const [simulationData, setSimulationData] = useState<SimulationFeedResponse | null>(() => {
    if (location.state?.simulationData) return location.state.simulationData;
    try {
      const saved = sessionStorage.getItem('btb_simulation_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [topic, setTopic] = useState<Topic | null>(() => {
    if (location.state?.topic) return location.state.topic;
    if (simulationData?.topic) return simulationData.topic;
    try {
      const saved = sessionStorage.getItem('btb_selected_topic');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(() => {
    if (location.state?.analysisData) return location.state.analysisData;
    try {
      const saved = sessionStorage.getItem('btb_analysis_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [exploredPerspectives, setExploredPerspectives] = useState<any[]>(() => {
    if (location.state?.exploredPerspectives) return location.state.exploredPerspectives;
    try {
      const saved = sessionStorage.getItem('btb_explored_perspectives');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const topicId = topic?.id || simulationData?.topic?.id || 'ai-jobs';
  const topicName = topic?.name || simulationData?.topic?.name || 'AI & Jobs';

  // 2. Challenge Hook managing flow, server validation, scoring, and reviews
  const {
    stage,
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    userAnswers,
    selectedAnswer,
    isAnswerLocked,
    submissionResult,
    loading,
    submitting,
    startChallenge,
    selectAnswer,
    nextQuestion,
    restartChallenge,
    viewReview,
    backToResults,
  } = useChallenge(topicId);

  // Scroll to top on stage or question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage, currentIndex]);

  if (loading && questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" aria-hidden="true" />
        <p className="text-sm font-mono text-slate-500">
          Loading Media Literacy Challenge modules...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* 0. Journey Progress Indicator */}
      <JourneyProgress currentStage="discover" topicName={topicName} />

      {/* Fallback notification for direct navigation without active session */}
      {!simulationData && stage === 'intro' && (
        <div
          id="direct-navigation-notice"
          className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3 text-xs text-blue-900 leading-relaxed"
        >
          <Compass className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-0.5">
            <span className="font-semibold text-blue-950 block">Direct Access Mode</span>
            <span>
              You are exploring the standalone Media Literacy Challenge. To experience the full
              personalized bubble simulation and perspective analysis first, you can{' '}
              <Link to={ROUTES.EXPLORE || '/explore'} className="underline font-bold hover:text-blue-800">
                start an exploration here
              </Link>
              .
            </span>
          </div>
        </div>
      )}

      {/* Stage 1: Intro Screen */}
      {stage === 'intro' && (
        <ChallengeIntro onStart={startChallenge} topicName={topicName} />
      )}

      {/* Stage 2: Active Challenge Questions */}
      {stage === 'active' && currentQuestion && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top navigation & Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Link
                to={ROUTES.PERSPECTIVES || '/perspectives'}
                state={{ simulationData, topic }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Exit to Perspectives</span>
              </Link>

              <span className="text-xs font-mono text-slate-400">
                Topic: <strong className="text-slate-700 font-semibold">{topicName}</strong>
              </span>
            </div>

            <ChallengeProgress
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              questions={questions}
              userAnswers={userAnswers}
            />
          </div>

          {/* Question Card */}
          <ChallengeQuestionCard
            question={currentQuestion}
            selectedOptionId={selectedAnswer}
            isLocked={isAnswerLocked}
            onSelectOption={selectAnswer}
            onNext={nextQuestion}
            isLastQuestion={currentIndex === totalQuestions - 1}
            isSubmitting={submitting}
          />
        </div>
      )}

      {/* Stage 3: Results Summary */}
      {stage === 'results' && submissionResult && (
        <ChallengeResults
          result={submissionResult}
          onReview={viewReview}
          onRetake={restartChallenge}
          topicId={topicId}
          simulationData={simulationData}
          analysisData={analysisData}
          topic={topic}
          exploredPerspectives={exploredPerspectives}
        />
      )}

      {/* Stage 4: Question-by-Question Review */}
      {stage === 'review' && submissionResult && (
        <ChallengeReviewView
          result={submissionResult}
          onBackToResults={backToResults}
          topicId={topicId}
          simulationData={simulationData}
          analysisData={analysisData}
          topic={topic}
          exploredPerspectives={exploredPerspectives}
        />
      )}
    </div>
  );
}
