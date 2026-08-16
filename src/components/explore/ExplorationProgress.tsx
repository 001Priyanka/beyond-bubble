import React from 'react';
import { JourneyProgress, JourneyStageId } from '../layout/JourneyProgress.js';

export interface ExplorationProgressProps {
  currentStep?: 1 | 2 | 3 | 4 | 5 | JourneyStageId;
  topicName?: string;
  className?: string;
}

export function ExplorationProgress({
  currentStep = 1,
  topicName,
  className,
}: ExplorationProgressProps) {
  let mappedStage: JourneyStageId = 'explore';
  if (typeof currentStep === 'string') {
    mappedStage = currentStep;
  } else if (currentStep === 1) {
    mappedStage = 'explore';
  } else if (currentStep === 2) {
    mappedStage = 'observe';
  } else if (currentStep === 3) {
    mappedStage = 'analyze';
  } else if (currentStep === 4) {
    mappedStage = 'discover';
  } else if (currentStep === 5) {
    mappedStage = 'reflect';
  }

  return (
    <JourneyProgress
      currentStage={mappedStage}
      topicName={topicName}
      className={className}
    />
  );
}
