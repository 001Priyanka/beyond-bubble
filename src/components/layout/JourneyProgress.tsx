import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Layers,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  Check,
  ChevronRight,
} from 'lucide-react';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';

export type JourneyStageId = 'explore' | 'observe' | 'analyze' | 'discover' | 'reflect';

export interface JourneyStageConfig {
  id: JourneyStageId;
  stepNumber: number;
  numberStr: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  route: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
}

export const JOURNEY_STAGES: JourneyStageConfig[] = [
  {
    id: 'explore',
    stepNumber: 1,
    numberStr: '01',
    title: 'Explore',
    shortLabel: 'Explore',
    subtitle: 'Topic & Preferences',
    route: ROUTES.EXPLORE,
    icon: Compass,
  },
  {
    id: 'observe',
    stepNumber: 2,
    numberStr: '02',
    title: 'Observe',
    shortLabel: 'Observe',
    subtitle: 'Simulated Feed',
    route: ROUTES.FEED,
    icon: Layers,
  },
  {
    id: 'analyze',
    stepNumber: 3,
    numberStr: '03',
    title: 'Analyze',
    shortLabel: 'Analyze',
    subtitle: 'Viewpoint Diversity',
    route: ROUTES.ANALYSIS,
    icon: BarChart3,
  },
  {
    id: 'discover',
    stepNumber: 4,
    numberStr: '04',
    title: 'Discover',
    shortLabel: 'Discover',
    subtitle: 'Perspectives & Challenge',
    route: ROUTES.PERSPECTIVES,
    icon: Lightbulb,
  },
  {
    id: 'reflect',
    stepNumber: 5,
    numberStr: '05',
    title: 'Reflect',
    shortLabel: 'Reflect',
    subtitle: 'Synthesis & Habits',
    route: ROUTES.REFLECTION,
    icon: CheckCircle2,
  },
];

export interface JourneyProgressProps {
  currentStage?: JourneyStageId | number;
  topicName?: string;
  className?: string;
}

export function JourneyProgress({
  currentStage = 'explore',
  topicName,
  className,
}: JourneyProgressProps) {
  // Normalize stage to 1..5 numeric index
  let currentStepNum = 1;
  if (typeof currentStage === 'number') {
    currentStepNum = currentStage;
  } else {
    const found = JOURNEY_STAGES.find((s) => s.id === currentStage);
    if (found) currentStepNum = found.stepNumber;
  }

  const activeStage = JOURNEY_STAGES[currentStepNum - 1] || JOURNEY_STAGES[0];

  return (
    <nav
      aria-label="Educational Journey Stages"
      className={cn(
        'w-full bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-2xs text-left',
        className
      )}
    >
      {/* Mobile Compact View (< md) */}
      <div className="md:hidden space-y-2.5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[11px] font-mono font-bold text-blue-700">
              Stage {activeStage.numberStr} / 05
            </span>
            <span className="font-bold text-slate-900 truncate">
              {activeStage.title}
              <span className="text-slate-400 font-normal ml-1.5 hidden xs:inline">
                ({activeStage.subtitle})
              </span>
            </span>
          </div>

          {topicName && (
            <span className="text-[11px] font-mono text-slate-500 truncate max-w-[120px]">
              {topicName}
            </span>
          )}
        </div>

        {/* 5-Segment Progress Track */}
        <div className="grid grid-cols-5 gap-1.5 h-1.5" role="presentation">
          {JOURNEY_STAGES.map((s) => {
            const isDone = s.stepNumber < currentStepNum;
            const isCurr = s.stepNumber === currentStepNum;
            return (
              <div
                key={s.id}
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  isCurr && 'bg-blue-600 shadow-2xs ring-2 ring-blue-100',
                  isDone && 'bg-emerald-600',
                  !isDone && !isCurr && 'bg-slate-100'
                )}
                title={`Stage ${s.numberStr}: ${s.title}`}
              />
            );
          })}
        </div>
      </div>

      {/* Desktop Full 5-Stage View (>= md) */}
      <ol className="hidden md:grid md:grid-cols-5 gap-2 items-center">
        {JOURNEY_STAGES.map((item) => {
          const isCurrent = item.stepNumber === currentStepNum;
          const isCompleted = item.stepNumber < currentStepNum;
          const isUpcoming = item.stepNumber > currentStepNum;
          const Icon = item.icon;

          return (
            <li
              key={item.id}
              className={cn(
                'relative flex items-center gap-2.5 p-2 rounded-xl transition-all duration-200 min-w-0',
                isCurrent && 'bg-blue-50/90 border border-blue-200/90 shadow-2xs',
                isCompleted && 'bg-slate-50/80 border border-slate-200/60 hover:bg-slate-100/80',
                isUpcoming && 'opacity-50 border border-transparent'
              )}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {/* Step Icon / Number Indicator */}
              <div
                className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors',
                  isCurrent && 'bg-blue-600 text-white shadow-2xs',
                  isCompleted && 'bg-emerald-600 text-white',
                  isUpcoming && 'bg-slate-100 text-slate-400'
                )}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Step Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      'text-[10px] font-mono font-bold tracking-wider',
                      isCurrent && 'text-blue-700',
                      isCompleted && 'text-emerald-700',
                      isUpcoming && 'text-slate-400'
                    )}
                  >
                    {item.numberStr}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-bold truncate',
                      isCurrent && 'text-slate-900',
                      isCompleted && 'text-slate-700',
                      isUpcoming && 'text-slate-500'
                    )}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
