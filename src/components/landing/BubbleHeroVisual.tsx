import React, { useState } from 'react';
import { Eye, Compass, ShieldCheck, Sparkles, Sliders, Info, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface AbstractNode {
  id: string;
  label: string;
  category: 'primary' | 'worker' | 'regulation' | 'research' | 'education' | 'ethics' | 'industry';
  stage: 1 | 2 | 3; // at which stage does this node become fully clear
  angle: number; // in degrees
  distance: number; // percentage from center
  color: string;
  description: string;
}

export function BubbleHeroVisual({ className }: { className?: string }) {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(2);
  const [selectedNode, setSelectedNode] = useState<AbstractNode | null>(null);

  const nodes: AbstractNode[] = [
    // Stage 1: Dense inside the initial bubble
    {
      id: 'ai-jobs',
      label: 'AI & Jobs (Tech Hype)',
      category: 'primary',
      stage: 1,
      angle: 25,
      distance: 22,
      color: '#0F172A',
      description: 'High-frequency algorithmic focus centered on rapid corporate product launches and productivity promises.',
    },
    {
      id: 'viral-spec',
      label: 'Viral Speculation',
      category: 'primary',
      stage: 1,
      angle: 145,
      distance: 26,
      color: '#1E293B',
      description: 'Sensationalist claims and emotional headlines that drive high viral engagement metrics.',
    },
    {
      id: 'automation-trend',
      label: 'Market Trend Alert',
      category: 'industry',
      stage: 1,
      angle: 265,
      distance: 24,
      color: '#0D9488',
      description: 'Venture investment summaries and quarterly enterprise technology adoption forecasts.',
    },

    // Stage 2: Adjacent perspectives in the expanding horizon
    {
      id: 'worker-perspective',
      label: 'Worker Perspective',
      category: 'worker',
      stage: 2,
      angle: 85,
      distance: 62,
      color: '#D97706',
      description: 'Lived workplace experiences, labor transition programs, and frontline practitioner insights.',
    },
    {
      id: 'regulation',
      label: 'Regulation & Policy',
      category: 'regulation',
      stage: 2,
      angle: 200,
      distance: 65,
      color: '#0284C7',
      description: 'Government inquiries, algorithmic accountability standards, and worker protection legislation.',
    },
    {
      id: 'research',
      label: 'Peer Research',
      category: 'research',
      stage: 2,
      angle: 325,
      distance: 60,
      color: '#4F46E5',
      description: 'Longitudinal empirical data on labor market shifts, displacement rates, and productivity measurement.',
    },

    // Stage 3: Broad perspective landscape
    {
      id: 'education',
      label: 'Education & Reskilling',
      category: 'education',
      stage: 3,
      angle: 160,
      distance: 82,
      color: '#059669',
      description: 'Curriculum development, vocational training frameworks, and lifelong learning equity initiatives.',
    },
    {
      id: 'ethics',
      label: 'Ethical Implications',
      category: 'ethics',
      stage: 3,
      angle: 295,
      distance: 86,
      color: '#9333EA',
      description: 'Fairness, transparency, bias mitigation, and long-term societal equity considerations.',
    },
  ];

  const stages = [
    {
      level: 1 as const,
      label: '1. Concentrated',
      sublabel: 'Single Feed Bubble',
      radiusPercent: 36,
      boundaryColor: '#3B82F6',
      boundaryBg: 'rgba(59, 130, 246, 0.05)',
      description: 'Algorithms repeatedly surface tightly clustered content matching previous engagement, leaving adjacent viewpoints in the periphery.',
    },
    {
      level: 2 as const,
      label: '2. Expanding',
      sublabel: 'Adjacent Viewpoints',
      radiusPercent: 68,
      boundaryColor: '#6366F1',
      boundaryBg: 'rgba(99, 102, 241, 0.04)',
      description: 'Active inquiry uncovers worker experiences, regulatory discussions, and empirical studies omitted from the primary stream.',
    },
    {
      level: 3 as const,
      label: '3. Landscape',
      sublabel: 'Full Spectrum',
      radiusPercent: 94,
      boundaryColor: '#0D9488',
      boundaryBg: 'rgba(13, 148, 136, 0.03)',
      description: 'A comprehensive, multi-stakeholder media landscape incorporating civic, academic, ethical, and community perspectives.',
    },
  ];

  const currentStage = stages.find((s) => s.level === activeStage) || stages[1];

  return (
    <div
      className={cn(
        'bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm relative overflow-hidden text-left',
        className
      )}
      aria-label="Interactive Information Bubble Simulation"
    >
      {/* Top Controls & Stage Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-0.5">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Simulated Perspective Expansion</span>
          </div>
          <p className="text-xs text-slate-500">
            Interactive Model: Observe how viewpoint diversity widens as the boundary expands.
          </p>
        </div>

        {/* 3-Stage Toggle Button Group */}
        <div
          role="group"
          aria-label="Expansion Stage Selector"
          className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl self-start sm:self-auto border border-slate-200/50"
        >
          {stages.map((stage) => (
            <button
              key={stage.level}
              type="button"
              onClick={() => {
                setActiveStage(stage.level);
                setSelectedNode(null);
              }}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none text-center',
                activeStage === stage.level
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/70'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
              )}
              aria-pressed={activeStage === stage.level}
            >
              <span>{stage.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Stage / Bubble Canvas */}
      <div className="relative w-full h-80 sm:h-[340px] my-4 bg-gradient-to-b from-slate-50/80 to-white border border-slate-200/70 rounded-xl overflow-hidden flex items-center justify-center select-none">
        {/* Concentric Polar Grid Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[90%] h-[90%] rounded-full border border-dashed border-slate-200/60" />
          <div className="absolute w-[65%] h-[65%] rounded-full border border-dashed border-slate-200/60" />
          <div className="absolute w-[36%] h-[36%] rounded-full border border-slate-200/80" />
          <div className="absolute w-full h-[1px] bg-slate-100" />
          <div className="absolute h-full w-[1px] bg-slate-100" />
        </div>

        {/* Dynamic Bubble Boundary Circle */}
        <div
          className="absolute rounded-full border-2 transition-all duration-700 ease-out pointer-events-none flex items-center justify-center"
          style={{
            width: `${currentStage.radiusPercent}%`,
            height: `${currentStage.radiusPercent}%`,
            borderColor: currentStage.boundaryColor,
            backgroundColor: currentStage.boundaryBg,
          }}
          aria-hidden="true"
        >
          <div
            className="absolute -top-3 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-tight bg-white border shadow-2xs transition-colors"
            style={{
              borderColor: currentStage.boundaryColor,
              color: currentStage.boundaryColor,
            }}
          >
            {activeStage === 1 && 'Filtered Feed Boundary'}
            {activeStage === 2 && 'Expanded Horizon'}
            {activeStage === 3 && 'Open Perspective Landscape'}
          </div>
        </div>

        {/* Perspective Nodes */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = 50 + (Math.cos(rad) * node.distance) / 2;
          const y = 50 + (Math.sin(rad) * node.distance) / 2;

          const isVisibleInStage = node.stage <= activeStage;
          const isSelected = selectedNode?.id === node.id;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                opacity: isVisibleInStage ? 1 : 0.28,
                filter: isVisibleInStage ? 'none' : 'blur(1.5px)',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedNode(node)}
                aria-label={`${node.label}: ${node.description}`}
                className={cn(
                  'group relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-white shadow-2xs transition-all duration-200 cursor-pointer outline-hidden',
                  isVisibleInStage
                    ? 'hover:scale-105 hover:shadow-xs hover:border-slate-400'
                    : 'cursor-not-allowed opacity-60',
                  isSelected && 'ring-2 ring-blue-500 scale-105 border-blue-600 bg-blue-50/50'
                )}
                style={{
                  borderColor: isVisibleInStage ? (isSelected ? '#2563EB' : '#CBD5E1') : '#E2E8F0',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: node.color }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-semibold text-slate-800 whitespace-nowrap">
                  {node.label}
                </span>
              </button>
            </div>
          );
        })}

        {/* Center Origin Node (The Observer) */}
        <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md ring-4 ring-white">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-white/95 px-1.5 py-0.5 rounded-md border border-slate-200 mt-1 shadow-2xs">
              Observer
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Stage Explanation or Selected Node Detail */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
        {selectedNode ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: selectedNode.color }}
                  aria-hidden="true"
                />
                <span className="font-bold text-slate-900">{selectedNode.label}</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                  {selectedNode.category}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{selectedNode.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold shrink-0 cursor-pointer"
            >
              Reset view
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
              <span>{currentStage.sublabel}</span>
              <span className="text-slate-400 font-normal text-[11px]">
                (Stage {activeStage} of 3)
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">{currentStage.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
