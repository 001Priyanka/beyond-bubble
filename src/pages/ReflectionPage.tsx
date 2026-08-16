import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { JourneyProgress } from '../components/layout/JourneyProgress.js';
import {
  useReflection,
  REFLECTION_Q1_OPTIONS,
  REFLECTION_Q2_OPTIONS,
} from '../hooks/useReflection.js';
import { ReflectionQuestion } from '../components/reflection/ReflectionQuestion.js';
import { ReflectionTextInput } from '../components/reflection/ReflectionTextInput.js';
import { FinalTakeaway } from '../components/reflection/FinalTakeaway.js';
import { ROUTES } from '../../shared/constants.js';
import type {
  SimulationFeedResponse,
  AnalysisResponse,
  ChallengeSubmissionResponse,
  Topic,
} from '../../shared/types.js';

export default function ReflectionPage(): React.JSX.Element {
  const location = useLocation();

  // 1. Recover state from router location state OR persistent sessionStorage
  const [simulationData] = useState<SimulationFeedResponse | null>(() => {
    if (location.state?.simulationData) return location.state.simulationData;
    try {
      const saved = sessionStorage.getItem('btb_simulation_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [analysisData] = useState<AnalysisResponse | null>(() => {
    if (location.state?.analysisData) return location.state.analysisData;
    try {
      const saved = sessionStorage.getItem('btb_analysis_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [challengeResult] = useState<ChallengeSubmissionResponse | null>(() => {
    if (location.state?.challengeResult) return location.state.challengeResult;
    try {
      const saved = sessionStorage.getItem('btb_challenge_result');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [topic] = useState<Topic | null>(() => {
    if (location.state?.topic) return location.state.topic;
    if (simulationData?.topic) return simulationData.topic;
    try {
      const saved = sessionStorage.getItem('btb_selected_topic');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [exploredPerspectives] = useState<any[]>(() => {
    if (location.state?.exploredPerspectives) return location.state.exploredPerspectives;
    try {
      const saved = sessionStorage.getItem('btb_explored_perspectives');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Reflection Hook managing Q1, Q2, optional Q3, validation, and completion view
  const {
    isCompleted,
    answers,
    isValid,
    summary,
    setQuestion1,
    setQuestion2,
    setQuestion3,
    completeReflection,
    retakeReflection,
  } = useReflection({
    simulationData,
    analysisData,
    challengeResult,
    topic,
    exploredPerspectives,
  });

  // Scroll to top on completion change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isCompleted]);

  // If completed, show Final Takeaway screen
  if (isCompleted) {
    return (
      <div className="min-h-[calc(100vh-8rem)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        {/* 0. Journey Progress Indicator */}
        <JourneyProgress currentStage="reflect" topicName={topic?.name} />

        <FinalTakeaway
          summary={summary}
          answers={answers}
          onRetakeReflection={retakeReflection}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      {/* 0. Journey Progress Indicator */}
      <JourneyProgress currentStage="reflect" topicName={topic?.name} />

      {/* Graceful Direct Access Notice */}
      {!simulationData && (
        <div
          id="direct-navigation-notice"
          className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3 text-xs text-blue-900 leading-relaxed"
        >
          <Compass className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-0.5">
            <span className="font-semibold text-blue-950 block">Direct Access Mode</span>
            <span>
              You are accessing the reflection stage directly. To experience the full interactive
              feed curation simulation and perspective explorer, you can{' '}
              <Link to={ROUTES.EXPLORE || '/explore'} className="underline font-bold hover:text-blue-800">
                start an exploration here
              </Link>
              .
            </span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center space-y-3.5 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Final Synthesis</span>
        </div>

        <h1
          id="reflection-main-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase font-mono"
        >
          TAKE A MOMENT TO REFLECT.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          You explored a simulated information environment, encountered less-represented
          perspectives, and practiced evaluating information.
        </p>

        <p className="text-sm sm:text-base font-semibold text-slate-800 italic">
          What changed in the way you look at information?
        </p>
      </div>

      {/* Interactive Reflection Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          completeReflection();
        }}
        className="space-y-6"
      >
        {/* Question 1 (Required) */}
        <ReflectionQuestion
          questionNumber={1}
          questionText="What will you be more likely to do when you encounter a strong claim online?"
          name="reflection_q1"
          options={REFLECTION_Q1_OPTIONS}
          selectedValue={answers.question1}
          onSelectOption={setQuestion1}
          required={true}
        />

        {/* Question 2 (Required) */}
        <ReflectionQuestion
          questionNumber={2}
          questionText="What surprised you most during the exploration?"
          name="reflection_q2"
          options={REFLECTION_Q2_OPTIONS}
          selectedValue={answers.question2}
          onSelectOption={setQuestion2}
          required={true}
        />

        {/* Question 3 (Optional Text) */}
        <ReflectionTextInput
          questionNumber={3}
          questionText="What is one habit you want to carry into your everyday information use?"
          value={answers.question3 || ''}
          onChange={setQuestion3}
          maxLength={300}
          placeholder="Example: I'll check the source before sharing."
        />

        {/* Action Controls & Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <Link
            to={ROUTES.CHALLENGE || '/challenge'}
            state={{ simulationData, analysisData, topic, exploredPerspectives }}
            id="reflection-back-to-challenge-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Challenge</span>
          </Link>

          <button
            type="submit"
            id="complete-reflection-btn"
            disabled={!isValid}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:shadow-none"
          >
            <span>Complete Reflection</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
