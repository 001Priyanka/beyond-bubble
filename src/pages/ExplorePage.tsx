import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Database,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ExplorationProgress } from '../components/explore/ExplorationProgress.js';
import { TopicCard } from '../components/explore/TopicCard.js';
import { PreferenceSelector } from '../components/explore/PreferenceSelector.js';
import { SelectionSummary } from '../components/explore/SelectionSummary.js';
import { SimulationTransparency } from '../components/explore/SimulationTransparency.js';
import { Button } from '../components/ui/Button.js';
import { useTopics } from '../hooks/useTopics.js';
import { SIMULATION_SESSION_KEY, ROUTES } from '../../shared/constants.js';
import type { SimulationConfig, Topic } from '../../shared/types.js';

export default function ExplorePage() {
  const navigate = useNavigate();
  const { topics, loading, error, source, refetch } = useTopics();

  // Exploration configuration state
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedAttentionTypes, setSelectedAttentionTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restore prior session configuration if available
  useEffect(() => {
    try {
      const savedConfig = sessionStorage.getItem(SIMULATION_SESSION_KEY);
      if (savedConfig) {
        const parsed: SimulationConfig = JSON.parse(savedConfig);
        if (parsed.topicId) {
          setSelectedTopicId(parsed.topicId);
        }
        if (Array.isArray(parsed.selectedContentFormats)) {
          setSelectedFormats(parsed.selectedContentFormats as string[]);
        }
        if (Array.isArray(parsed.selectedAttentionTypes)) {
          setSelectedAttentionTypes(parsed.selectedAttentionTypes as string[]);
        }
      }
    } catch {
      // Ignore parse errors on session storage
    }
  }, []);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const handleToggleFormat = (formatId: string) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId) ? prev.filter((id) => id !== formatId) : [...prev, formatId]
    );
  };

  const handleToggleAttentionType = (typeId: string) => {
    setSelectedAttentionTypes((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    );
  };

  const handleReset = () => {
    setSelectedTopicId(null);
    setSelectedFormats([]);
    setSelectedAttentionTypes([]);
    try {
      sessionStorage.removeItem(SIMULATION_SESSION_KEY);
    } catch {
      // Ignore
    }
  };

  const handleSubmitSimulation = () => {
    if (!selectedTopicId) return;

    setIsSubmitting(true);

    const simulationConfig: SimulationConfig = {
      topicId: selectedTopicId,
      selectedContentFormats: selectedFormats,
      selectedAttentionTypes: selectedAttentionTypes,
      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem(SIMULATION_SESSION_KEY, JSON.stringify(simulationConfig));
    } catch (e) {
      console.warn('Could not write to sessionStorage:', e);
    }

    // Small tactile delay for smooth UX transition
    setTimeout(() => {
      navigate(ROUTES.FEED, { state: { simulationConfig } });
    }, 150);
  };

  const selectedTopic: Topic | null =
    topics.find((t) => t.id === selectedTopicId) || null;

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-10 sm:space-y-12">
      {/* 0. Journey Progress Indicator */}
      <ExplorationProgress currentStep="explore" topicName={selectedTopic?.name} />

      {/* 1. Step 1: Topic Selection */}
      <section aria-labelledby="topic-selection-heading" className="space-y-6 text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/70 text-[11px] font-mono font-semibold text-blue-700">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Step 1 — Topic Selection</span>
          </div>

          <h1
            id="topic-selection-heading"
            className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase"
          >
            WHAT ARE YOU CURIOUS ABOUT?
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-medium">
            Choose a topic to explore how different information environments can shape what you encounter.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-slate-100 animate-pulse border border-slate-200/80 p-6 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-200" />
                  <div className="w-3/4 h-5 rounded bg-slate-200" />
                  <div className="w-full h-3 rounded bg-slate-200" />
                  <div className="w-5/6 h-3 rounded bg-slate-200" />
                </div>
                <div className="w-1/2 h-3 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && topics.length === 0 && (
          <div
            role="alert"
            className="p-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-3"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>Failed to load exploration topics</span>
            </div>
            <p className="text-xs text-rose-700">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry Connection
            </Button>
          </div>
        )}

        {/* Topic Grid */}
        {!loading && topics.length > 0 && (
          <div
            role="radiogroup"
            aria-label="Available exploration topics"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isSelected={selectedTopicId === topic.id}
                onSelect={handleSelectTopic}
              />
            ))}
          </div>
        )}

        {/* Subtle source indicator for developer/transparency awareness */}
        {!loading && source && (
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-slate-400" />
              Source: {source === 'database' ? 'MongoDB Atlas' : 'Standard Seed Registry'}
            </span>
            <span>Single topic required</span>
          </div>
        )}
      </section>

      {/* 2. Step 2: Content Preferences */}
      <section
        aria-labelledby="preferences-heading"
        className="pt-8 border-t border-slate-200/90"
      >
        <PreferenceSelector
          selectedFormats={selectedFormats}
          selectedAttentionTypes={selectedAttentionTypes}
          onToggleFormat={handleToggleFormat}
          onToggleAttentionType={handleToggleAttentionType}
        />
      </section>

      {/* 3. Live Configuration Preview / Summary */}
      <section aria-labelledby="summary-heading">
        <SelectionSummary
          topic={selectedTopic}
          selectedFormats={selectedFormats}
          selectedAttentionTypes={selectedAttentionTypes}
          onReset={handleReset}
        />
      </section>

      {/* 4. Step 3: Simulation Transparency & Launch CTA */}
      <section aria-labelledby="simulation-transparency-heading">
        <SimulationTransparency
          selectedTopic={selectedTopic}
          onSubmit={handleSubmitSimulation}
          isSubmitting={isSubmitting}
        />
      </section>
    </div>
  );
}
