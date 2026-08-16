import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils.js';

export interface ExpandingMetaphorVisualProps {
  perspectiveCount?: number;
  exploredCount?: number;
  className?: string;
}

export function ExpandingMetaphorVisual({
  perspectiveCount = 4,
  exploredCount = 1,
  className,
}: ExpandingMetaphorVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  // Coordinates for 4 surrounding perspective nodes expanding outward from center
  const nodes = [
    { cx: 30, cy: 35, color: '#3b82f6', label: 'View 1' },
    { cx: 70, cy: 30, color: '#8b5cf6', label: 'View 2' },
    { cx: 25, cy: 75, color: '#059669', label: 'View 3' },
    { cx: 75, cy: 70, color: '#d97706', label: 'View 4' },
  ];

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 overflow-hidden',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-24 h-24 sm:w-28 sm:h-28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Subtle Radar Rings */}
        <circle cx="50" cy="50" r="42" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="26" stroke="rgba(148, 163, 184, 0.18)" strokeWidth="1" />
        <circle cx="50" cy="50" r="10" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="1" />

        {/* Connecting Rays from Central Origin to Perspective Nodes */}
        {nodes.map((node, i) => (
          <motion.line
            key={`ray-${i}`}
            x1="50"
            y1="50"
            x2={node.cx}
            y2={node.cy}
            stroke={node.color}
            strokeWidth="1.2"
            strokeOpacity="0.4"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0.2, opacity: 0.3 }}
            animate={
              shouldReduceMotion
                ? { pathLength: 1 }
                : {
                    pathLength: [0.3, 1, 0.7, 1],
                    opacity: [0.3, 0.8, 0.5, 0.8],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Central Origin Node (The initial single view) */}
        <circle cx="50" cy="50" r="5" fill="#f8fafc" />
        <circle cx="50" cy="50" r="8" stroke="#f8fafc" strokeOpacity="0.3" strokeWidth="1.5" />

        {/* Outer Perspective Nodes (The expanded horizon) */}
        {nodes.map((node, i) => {
          const isNodeExplored = i < exploredCount;
          return (
            <g key={`node-${i}`}>
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={isNodeExplored ? '4.5' : '3.5'}
                fill={node.color}
                initial={shouldReduceMotion ? {} : { scale: 0.9 }}
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [0.9, 1.15, 0.9],
                        opacity: [0.7, 1, 0.7],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
              />
              {isNodeExplored && (
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="7"
                  stroke={node.color}
                  strokeOpacity="0.5"
                  strokeWidth="1"
                />
              )}
            </g>
          );
        })}
      </svg>

      <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase mt-1">
        From 1 View to Many Views
      </span>
    </div>
  );
}
