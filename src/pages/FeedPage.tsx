import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  AlertCircle,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button.js';
import { ExplorationProgress } from '../components/explore/ExplorationProgress.js';
import { JourneyProgress } from '../components/layout/JourneyProgress.js';
import { SimulationHeader } from '../components/feed/SimulationHeader.js';
import { SimulatedFeed } from '../components/feed/SimulatedFeed.js';
import { SimulationSummary } from '../components/feed/SimulationSummary.js';
import { FeedLoadingState } from '../components/feed/FeedLoadingState.js';
import { FeedErrorState } from '../components/feed/FeedErrorState.js';
import { useSimulatedFeed } from '../hooks/useSimulatedFeed.js';
import { SIMULATION_SESSION_KEY, ROUTES, INITIAL_TOPICS } from '../../shared/constants.js';
import type { SimulationConfig, Topic } from '../../shared/types.js';

export const SIMULATION_DATA_STORAGE_KEY = 'btb_active_simulation_data';

export default function FeedPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [config, setConfig] = useState<SimulationConfig | null>(null);

  // 1. Retrieve config from navigation state or sessionStorage
  useEffect(() => {
    const stateConfig = (location.state as { simulationConfig?: SimulationConfig })
      ?.simulationConfig;
    if (stateConfig) {
      setConfig(stateConfig);
      return;
    }

    try {
      const stored = sessionStorage.getItem(SIMULATION_SESSION_KEY);
      if (stored) {
        setConfig(JSON.parse(stored));
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }
  }, [location.state]);

  // 2. Fetch deterministic simulation feed
  const { data: simulationData, loading, error, refetch } = useSimulatedFeed(
    config
      ? {
          topicId: config.topicId,
          selectedContentFormats: config.selectedContentFormats as string[],
          selectedAttentionTypes: config.selectedAttentionTypes as string[],
        }
      : null
  );

  // 3. Persist simulation data for Stage 2 (Analysis) handoff
  useEffect(() => {
    if (simulationData) {
      try {
        sessionStorage.setItem(
          SIMULATION_DATA_STORAGE_KEY,
          JSON.stringify(simulationData)
        );
        sessionStorage.setItem(
          'btb_simulation_data',
          JSON.stringify(simulationData)
        );
        if (simulationData.topic) {
          sessionStorage.setItem(
            'btb_selected_topic',
            JSON.stringify(simulationData.topic)
          );
        }
      } catch {
        // Ignore storage quotas
      }
    }
  }, [simulationData]);

  // If no simulation configuration exists at all
  if (!config && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8 text-left">
        <ExplorationProgress currentStep={1} />

        <div className="bg-white border border-amber-200/90 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200/60 shadow-2xs">
            <Compass className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-900">
              No Simulation Configuration Found
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              To construct a simulated information environment, please choose an exploration topic
              and your content preferences first.
            </p>
          </div>

          <Link to={ROUTES.EXPLORE}>
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Compass className="w-4 h-4" />}
              className="font-bold px-6 py-3"
            >
              Start Topic Exploration →
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const topic: Topic | null =
    simulationData?.topic ||
    INITIAL_TOPICS.find((t) => t.id === config?.topicId) ||
    null;

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8 sm:space-y-10">
      {/* 0. Journey Progress Indicator */}
      <JourneyProgress currentStage="observe" topicName={topic?.name} />

      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          to={ROUTES.EXPLORE}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100/70"
        >
          <Compass className="w-3.5 h-3.5" aria-hidden="true" />
          <span>← Back to Topic & Preferences</span>
        </Link>

        {topic && (
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Topic: <strong className="text-slate-700">{topic.name}</strong>
          </span>
        )}
      </div>

      {/* 1. Header with educational labels & badges */}
      <SimulationHeader
        topic={topic}
        selectedFormatsCount={config?.selectedContentFormats?.length || 0}
        selectedAttentionCount={config?.selectedAttentionTypes?.length || 0}
      />

      {/* 2. Loading State */}
      {loading && <FeedLoadingState itemCount={5} />}

      {/* 3. Error State */}
      {!loading && error && <FeedErrorState error={error} onRetry={() => refetch()} />}

      {/* 4. Active Feed Display */}
      {!loading && !error && simulationData && (
        <>
          {/* Transparency & Source Attribution Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span>
                Source:{' '}
                <strong className="text-slate-800">
                  {simulationData.simulationMetadata.source === 'database'
                    ? 'MongoDB Atlas (Controlled Database)'
                    : 'Development simulation data'}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-sans font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{simulationData.feed.length} items synthesized</span>
            </div>
          </div>

          {/* 5. Simulated Editorial Feed */}
          <SimulatedFeed items={simulationData.feed} topicName={topic?.name} />

          {/* 6. Simulation Summary & Stage 2 Transition */}
          <SimulationSummary simulationData={simulationData} />
        </>
      )}
    </div>
  );
}
