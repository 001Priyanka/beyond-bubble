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
} from 'lucide-react';
import { ExplorationProgress } from '../components/explore/ExplorationProgress.js';
import { AnalysisHero } from '../components/analysis/AnalysisHero.js';
import { ScoreOverview } from '../components/analysis/ScoreOverview.js';
import { ScoreBreakdown } from '../components/analysis/ScoreBreakdown.js';
import { PerspectiveDistribution } from '../components/analysis/PerspectiveDistribution.js';
import { SourceDistribution } from '../components/analysis/SourceDistribution.js';
import { ContentFramingDistribution } from '../components/analysis/ContentFramingDistribution.js';
import { MissingPerspectives } from '../components/analysis/MissingPerspectives.js';
import { AnalysisMethodology } from '../components/analysis/AnalysisMethodology.js';
import { Button } from '../components/ui/Button.js';
import { usePerspectiveAnalysis } from '../hooks/usePerspectiveAnalysis.js';
import { ROUTES, INITIAL_TOPICS } from '../../shared/constants.js';
import { SIMULATION_DATA_STORAGE_KEY } from './FeedPage.js';
import type { SimulationFeedResponse, Topic } from '../../shared/types.js';

export default function AnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [simulationData, setSimulationData] = useState<SimulationFeedResponse | null>(null);

  // 1. Retrieve simulation data from location state or sessionStorage
  useEffect(() => {
    const stateData = (location.state as { simulationData?: SimulationFeedResponse })
      ?.simulationData;
    if (stateData) {
      setSimulationData(stateData);
      return;
    }

    try {
      const stored = sessionStorage.getItem(SIMULATION_DATA_STORAGE_KEY);
      if (stored) {
        setSimulationData(JSON.parse(stored));
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
  }, [location.state]);

  // 2. Run analysis engine hook (deterministic Shannon entropy calculations)
  const { data: analysis, loading, error, refetch } = usePerspectiveAnalysis(simulationData);

  // Cache analysis result in sessionStorage for downstream phases
  useEffect(() => {
    if (analysis) {
      try {
        sessionStorage.setItem('btb_analysis_data', JSON.stringify(analysis));
      } catch {
        // Ignore storage errors
      }
    }
  }, [analysis]);

  // Fallback state if user navigated directly without running a simulation
  if (!simulationData && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8 text-left">
        <ExplorationProgress currentStep={2} />

        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200/60 shadow-2xs">
            <Compass className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-900">
              No Simulated Environment to Analyze
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To evaluate a Perspective Diversity Score, please run through a simulated information
              environment first.
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
    INITIAL_TOPICS.find((t) => t.id === simulationData?.simulationMetadata?.topicId) ||
    null;

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 sm:space-y-10">
      {/* 0. Journey Progress Indicator */}
      <ExplorationProgress currentStep="analyze" topicName={topic?.name} />

      {/* 1. Section 1: Hero */}
      <AnalysisHero
        topic={topic}
        itemCount={simulationData?.feed?.length || 0}
      />

      {/* Loading state */}
      {loading && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center space-y-4 shadow-xs">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Computing Information Entropy</h3>
            <p className="text-xs text-slate-500 font-mono">
              Evaluating viewpoint, source, and framing diversity across feed items...
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-white border border-rose-200 rounded-2xl p-6 sm:p-8 text-left space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Analysis Calculation Error</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{error}</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Retry Analysis
          </Button>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysis && !loading && (
        <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300">
          {/* Section 2: Main Score Overview */}
          <ScoreOverview
            score={analysis.overallScore}
            interpretation={analysis.interpretation}
            topicTitle={topic?.name}
          />

          {/* Section 3: Score Breakdown (50% Viewpoint, 30% Source, 20% Content) */}
          <ScoreBreakdown
            viewpointScore={analysis.viewpointScore}
            sourceScore={analysis.sourceScore}
            contentScore={analysis.contentScore}
            breakdown={analysis.breakdown}
          />

          {/* Section 4: What Did You Encounter? (Perspective Distribution) */}
          <PerspectiveDistribution
            distribution={analysis.perspectiveDistribution}
            percentageDistribution={analysis.breakdown.viewpoint.percentageDistribution}
            totalItems={analysis.itemCount}
            dominantPerspective={analysis.dominantPerspective}
          />

          {/* Grid for Dimensions 2 & 3: Source and Content Framing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 5: Source Distribution */}
            <SourceDistribution
              distribution={analysis.sourceDistribution}
              percentageDistribution={analysis.breakdown.source.percentageDistribution}
              totalItems={analysis.itemCount}
            />

            {/* Section 6: Content Framing */}
            <ContentFramingDistribution
              distribution={analysis.contentDistribution}
              percentageDistribution={analysis.breakdown.content.percentageDistribution}
              totalItems={analysis.itemCount}
            />
          </div>

          {/* Section 7: What Might You Be Missing? */}
          <MissingPerspectives
            underrepresentedPerspectives={analysis.underrepresentedPerspectives}
            topic={topic}
            simulationData={simulationData}
            analysisData={analysis}
          />

          {/* Section 8: Methodology */}
          <AnalysisMethodology />

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <Link
              to={ROUTES.FEED}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Simulated Feed</span>
            </Link>

            <Link
              to={ROUTES.PERSPECTIVES || '/perspectives'}
              state={{ simulationData, analysisData: analysis }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-2xs"
            >
              <span>Next: Explore Diverse Perspectives</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
