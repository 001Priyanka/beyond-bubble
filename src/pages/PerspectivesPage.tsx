import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ExplorationProgress } from '../components/explore/ExplorationProgress.js';
import { PerspectiveHero } from '../components/perspectives/PerspectiveHero.js';
import { PerspectiveBalanceTracker } from '../components/perspectives/PerspectiveBalanceTracker.js';
import { UnderrepresentedList } from '../components/perspectives/UnderrepresentedList.js';
import { PerspectiveDetailView } from '../components/perspectives/PerspectiveDetailView.js';
import { Button } from '../components/ui/Button.js';
import { usePerspectiveExplorer } from '../hooks/usePerspectiveExplorer.js';
import { ROUTES, INITIAL_TOPICS } from '../../shared/constants.js';
import { SIMULATION_DATA_STORAGE_KEY } from './FeedPage.js';
import type {
  SimulationFeedResponse,
  AnalysisResponse,
  Topic,
  UnderrepresentedPerspective,
} from '../../shared/types.js';

export const ANALYSIS_DATA_STORAGE_KEY = 'btb_analysis_data';

export default function PerspectivesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [simulationData, setSimulationData] = useState<SimulationFeedResponse | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);

  // 1. Retrieve session data from location state or sessionStorage
  useEffect(() => {
    // Check location.state first
    const state = location.state as {
      simulationData?: SimulationFeedResponse;
      analysisData?: AnalysisResponse;
      initialPerspectiveName?: string;
    };

    if (state?.simulationData) {
      setSimulationData(state.simulationData);
    } else {
      try {
        const storedSim = sessionStorage.getItem(SIMULATION_DATA_STORAGE_KEY);
        if (storedSim) {
          setSimulationData(JSON.parse(storedSim));
        }
      } catch {
        // Ignore parsing errors
      }
    }

    if (state?.analysisData) {
      setAnalysisData(state.analysisData);
    } else {
      try {
        const storedAnalysis = sessionStorage.getItem(ANALYSIS_DATA_STORAGE_KEY);
        if (storedAnalysis) {
          setAnalysisData(JSON.parse(storedAnalysis));
        }
      } catch {
        // Ignore parsing errors
      }
    }
  }, [location.state]);

  const topicId =
    simulationData?.topic?.id ||
    simulationData?.simulationMetadata?.topicId ||
    'ai-jobs';

  const initialPerspectiveName =
    (location.state as any)?.initialPerspectiveName ||
    analysisData?.underrepresentedPerspectives?.[0]?.perspective ||
    null;

  // 2. Load perspectives and representative content via hook
  const {
    perspectives,
    selectedPerspective,
    representativeContent,
    comparisonPerspective,
    exploredPerspectives,
    loading,
    contentLoading,
    error,
    selectPerspective,
    selectComparison,
    refetch,
  } = usePerspectiveExplorer({
    topicId: simulationData ? topicId : null,
    initialPerspectiveName,
  });

  // Direct arrival without simulation session
  if (!simulationData && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8 text-left">
        <ExplorationProgress currentStep={3} />

        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200/60 shadow-2xs">
            <Compass className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-900">
              No Active Simulation Session Found
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To explore perspectives in context, start by selecting an exploration topic and
              generating your simulated feed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to={ROUTES.EXPLORE}>
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Compass className="w-4 h-4" />}
                className="font-bold px-6 py-3 w-full sm:w-auto"
              >
                Choose Exploration Topic →
              </Button>
            </Link>
            <Link to={ROUTES.FEED}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Go to Simulated Feed
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const topic: Topic | null =
    simulationData?.topic ||
    INITIAL_TOPICS.find((t) => t.id === topicId) ||
    null;

  const originalDistribution: Record<string, number> =
    analysisData?.breakdown?.viewpoint?.percentageDistribution ||
    (simulationData?.simulationMetadata?.perspectiveDistribution
      ? Object.fromEntries(
          Object.entries(simulationData.simulationMetadata.perspectiveDistribution).map(
            ([k, v]) => [k, typeof v === 'number' ? v : (v as { percentage: number }).percentage]
          )
        )
      : {});

  const underrepresentedList: UnderrepresentedPerspective[] =
    analysisData?.underrepresentedPerspectives || [];

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 sm:space-y-10">
      {/* 0. Journey Progress Indicator */}
      <ExplorationProgress currentStep="discover" topicName={topic?.name} />

      {/* 1. Section 1: Introduction & Hero */}
      <PerspectiveHero
        topic={topic}
        perspectiveCount={perspectives.length}
        exploredCount={exploredPerspectives.length}
      />

      {/* Loading state */}
      {loading && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-4 shadow-xs">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Loading Perspective Data</h3>
            <p className="text-xs text-slate-500 font-mono">
              Retrieving controlled perspectives, arguments, and simulated content...
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-white border border-rose-200 rounded-2xl p-6 sm:p-8 text-left space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Perspective Explorer Error</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{error}</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && perspectives.length > 0 && (
        <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300">
          {/* Section 2: Underrepresented Perspectives Card Grid */}
          <UnderrepresentedList
            perspectives={perspectives}
            underrepresentedPerspectives={underrepresentedList}
            feedDistribution={originalDistribution}
            selectedPerspectiveId={selectedPerspective?.id || null}
            exploredPerspectives={exploredPerspectives}
            onSelectPerspective={(id) => {
              selectPerspective(id);
              const detailEl = document.getElementById('perspective-detail-experience');
              if (detailEl) {
                detailEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />

          {/* Section 3: Dedicated Perspective Detail Experience */}
          {selectedPerspective && (
            <PerspectiveDetailView
              perspective={selectedPerspective}
              allPerspectives={perspectives}
              representativeContent={representativeContent}
              contentLoading={contentLoading}
              comparisonPerspective={comparisonPerspective}
              onSelectComparison={selectComparison}
            />
          )}

          {/* Educational Progress Tracker: Perspective Balance */}
          <PerspectiveBalanceTracker
            originalDistribution={originalDistribution}
            perspectives={perspectives}
            exploredPerspectives={exploredPerspectives}
            selectedPerspectiveName={selectedPerspective?.name || null}
          />

          {/* Primary Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <Link
              to={ROUTES.ANALYSIS || '/analysis'}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Analysis</span>
            </Link>

            <Link
              to={ROUTES.CHALLENGE || '/challenge'}
              state={{ simulationData, analysisData, topic, exploredPerspectives }}
              id="continue-challenge-cta"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Continue to Media Literacy Challenge</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
