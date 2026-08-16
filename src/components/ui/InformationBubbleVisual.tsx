import React, { useState } from 'react';
import { Eye, Compass, Layers, Sparkles, Filter, Globe2 } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface NodeItem {
  id: string;
  label: string;
  category: 'primary' | 'civic' | 'academic' | 'industry' | 'community' | 'ethics';
  isInsideBubble: boolean;
  angle: number; // in degrees
  distancePercent: number; // % from center
  color: string;
}

export function InformationBubbleVisual({ className }: { className?: string }) {
  const [expansionStage, setExpansionStage] = useState<'concentrated' | 'expanding' | 'landscape'>('expanding');

  const nodes: NodeItem[] = [
    { id: '1', label: 'Primary Algorithm Bias', category: 'primary', isInsideBubble: true, angle: 0, distancePercent: 18, color: '#0F172A' },
    { id: '2', label: 'Similar Viral Post', category: 'primary', isInsideBubble: true, angle: 110, distancePercent: 24, color: '#1E293B' },
    { id: '3', label: 'Echo Source A', category: 'primary', isInsideBubble: true, angle: 240, distancePercent: 22, color: '#334155' },
    { id: '4', label: 'Peer Research', category: 'academic', isInsideBubble: false, angle: 45, distancePercent: 65, color: '#4F46E5' },
    { id: '5', label: 'Public Policy', category: 'civic', isInsideBubble: false, angle: 140, distancePercent: 72, color: '#0284C7' },
    { id: '6', label: 'Labor Stance', category: 'community', isInsideBubble: false, angle: 200, distancePercent: 68, color: '#D97706' },
    { id: '7', label: 'Ethical Values', category: 'ethics', isInsideBubble: false, angle: 290, distancePercent: 78, color: '#9333EA' },
    { id: '8', label: 'Market Economic', category: 'industry', isInsideBubble: false, angle: 340, distancePercent: 60, color: '#0D9488' },
  ];

  // Stage multipliers for visual boundary radius
  const stageConfig = {
    concentrated: {
      radiusPercent: 35,
      boundaryOpacity: 0.9,
      blurFilter: 'blur(2px)',
      outsideOpacity: 0.25,
      stageLabel: 'Concentrated Bubble (Single-Viewpoint Exposure)',
      explanation: 'Feed algorithms repeatedly serve content closely aligned with existing browsing patterns, leaving peripheral viewpoints obscured.',
    },
    expanding: {
      radiusPercent: 60,
      boundaryOpacity: 0.5,
      blurFilter: 'blur(0px)',
      outsideOpacity: 0.65,
      stageLabel: 'Expanding Horizon (Recognizing Blindspots)',
      explanation: 'Active inquiry reveals adjacent stakeholders and differing interpretations previously omitted from the primary stream.',
    },
    landscape: {
      radiusPercent: 95,
      boundaryOpacity: 0.15,
      boundaryDashed: true,
      blurFilter: 'blur(0px)',
      outsideOpacity: 1,
      stageLabel: 'Broader Perspective Landscape (Synthesized Inquiry)',
      explanation: 'A comprehensive media environment incorporating empirical, civic, economic, and community viewpoints across the entire topic.',
    },
  };

  const current = stageConfig[expansionStage];

  return (
    <div className={cn('bg-white border border-slate-200 rounded-xl p-6 shadow-xs text-left', className)}>
      {/* Header & Stage Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-blue)]">
            Core Conceptual Metaphor
          </span>
          <h4 className="text-base font-bold text-slate-900 leading-snug">
            Information Bubble → Perspective Landscape
          </h4>
        </div>

        {/* Stage Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setExpansionStage('concentrated')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
              expansionStage === 'concentrated'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            )}
          >
            1. Bubble
          </button>
          <button
            type="button"
            onClick={() => setExpansionStage('expanding')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
              expansionStage === 'expanding'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            )}
          >
            2. Expanding
          </button>
          <button
            type="button"
            onClick={() => setExpansionStage('landscape')}
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
              expansionStage === 'landscape'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            )}
          >
            3. Landscape
          </button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="relative w-full h-80 sm:h-96 my-4 bg-slate-50/70 border border-slate-200/80 rounded-xl overflow-hidden flex items-center justify-center select-none">
        {/* Subtle Background Polar Grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[85%] rounded-full border border-slate-200/60" />
          <div className="absolute w-[60%] h-[60%] rounded-full border border-slate-200/60" />
          <div className="absolute w-[35%] h-[35%] rounded-full border border-slate-200/60" />
          <div className="absolute w-full h-[1px] bg-slate-200/50" />
          <div className="absolute h-full w-[1px] bg-slate-200/50" />
        </div>

        {/* Dynamic Bubble Boundary */}
        <div
          className="absolute rounded-full border-2 border-indigo-400/80 bg-indigo-500/5 transition-all duration-700 ease-out pointer-events-none flex items-center justify-center"
          style={{
            width: `${current.radiusPercent}%`,
            height: `${current.radiusPercent}%`,
            opacity: current.boundaryOpacity,
            borderColor: expansionStage === 'landscape' ? '#0D9488' : '#3B82F6',
          }}
        >
          <span className="text-[10px] font-mono font-bold tracking-wider text-blue-600/70 absolute -top-3.5 bg-white px-2 py-0.5 rounded-full border border-blue-200/60 shadow-2xs">
            {expansionStage === 'landscape' ? 'Open Knowledge Horizon' : 'Information Boundary'}
          </span>
        </div>

        {/* Information Nodes */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = 50 + (Math.cos(rad) * node.distancePercent) / 2;
          const y = 50 + (Math.sin(rad) * node.distancePercent) / 2;

          const isRevealed =
            node.isInsideBubble ||
            expansionStage === 'landscape' ||
            (expansionStage === 'expanding' && node.distancePercent <= 68);

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                opacity: isRevealed ? 1 : current.outsideOpacity,
                filter: isRevealed ? 'none' : current.blurFilter,
              }}
            >
              <div
                className="group relative flex items-center gap-1.5 px-2.5 py-1 bg-white border rounded-full shadow-xs cursor-default transition-transform hover:scale-105"
                style={{
                  borderColor: isRevealed ? node.color : '#CBD5E1',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: node.color }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-medium text-slate-800 whitespace-nowrap">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        {/* Center Origin Node (User Point of Observation) */}
        <div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded-md border border-slate-200 mt-1 shadow-2xs">
              Observer
            </span>
          </div>
        </div>
      </div>

      {/* Stage Explainer Footer */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
        <div className="font-semibold text-slate-900 mb-0.5 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>{current.stageLabel}</span>
        </div>
        <p className="leading-relaxed">{current.explanation}</p>
      </div>
    </div>
  );
}
