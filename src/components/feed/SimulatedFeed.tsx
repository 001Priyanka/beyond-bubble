import React from 'react';
import { motion } from 'motion/react';
import { SimulatedContentCard } from './SimulatedContentCard.js';
import { AlertCircle, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button.js';
import { ROUTES } from '../../../shared/constants.js';
import { cn } from '../../lib/utils.js';
import type { SimulatedContentItem } from '../../../shared/types.js';

export interface SimulatedFeedProps {
  items: SimulatedContentItem[];
  topicName?: string;
  className?: string;
}

export function SimulatedFeed({ items, topicName, className }: SimulatedFeedProps) {
  if (items.length === 0) {
    return (
      <div
        role="status"
        className="bg-white border border-amber-200 rounded-2xl p-8 text-center space-y-4 shadow-2xs"
      >
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200/60">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">No Simulated Content Matched</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            We could not find items matching this exact configuration. Please try adjusting your
            preferences.
          </p>
        </div>
        <Link to={ROUTES.EXPLORE}>
          <Button variant="primary" size="sm" leftIcon={<Compass className="w-3.5 h-3.5" />}>
            Adjust Preferences
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section
      aria-label="Simulated Information Feed"
      className={cn('space-y-4 sm:space-y-5', className)}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
        >
          <SimulatedContentCard
            item={item}
            topicName={topicName}
          />
        </motion.div>
      ))}
    </section>
  );
}
