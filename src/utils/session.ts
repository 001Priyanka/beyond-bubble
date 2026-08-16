import {
  SIMULATION_SESSION_KEY,
  INITIAL_TOPICS,
} from '../../shared/constants.js';
import type {
  SimulationConfig,
  SimulationFeedResponse,
  AnalysisResponse,
  ChallengeSubmissionResponse,
  Topic,
  PerspectiveDetail,
} from '../../shared/types.js';

export const SESSION_KEYS = {
  SIMULATION_CONFIG: SIMULATION_SESSION_KEY,
  SIMULATION_DATA: 'btb_simulation_data',
  ACTIVE_SIMULATION_DATA: 'btb_active_simulation_data',
  ANALYSIS_DATA: 'btb_analysis_data',
  EXPLORED_PERSPECTIVES: 'btb_explored_perspectives',
  CHALLENGE_RESULT: 'btb_challenge_result',
  SELECTED_TOPIC: 'btb_selected_topic',
  REFLECTION_ANSWERS: 'btb_reflection_answers',
  REFLECTION_COMPLETED: 'btb_reflection_completed',
} as const;

/**
 * Safely writes an object to sessionStorage
 */
export function setSessionItem<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`[SessionStorage] Could not write to ${key}:`, err);
  }
}

/**
 * Safely reads and parses an object from sessionStorage
 */
export function getSessionItem<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[SessionStorage] Could not parse ${key}:`, err);
    return null;
  }
}

/**
 * Safely removes an item from sessionStorage
 */
export function removeSessionItem(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

/**
 * Clears all Beyond the Bubble session keys for a fresh exploration
 */
export function clearAllSessionState(): void {
  Object.values(SESSION_KEYS).forEach((key) => {
    removeSessionItem(key);
  });
}

/**
 * Recovers topic information from simulation data or fallback defaults
 */
export function resolveTopic(
  topicIdOrObj?: string | Topic | null,
  simulationData?: SimulationFeedResponse | null
): Topic {
  if (topicIdOrObj && typeof topicIdOrObj === 'object') {
    return topicIdOrObj;
  }

  if (simulationData?.topic) {
    return simulationData.topic;
  }

  const tid =
    typeof topicIdOrObj === 'string'
      ? topicIdOrObj
      : simulationData?.simulationMetadata?.topicId || 'ai-jobs';

  const matched = INITIAL_TOPICS.find((t) => t.id === tid);
  if (matched) return matched;

  return INITIAL_TOPICS[0];
}
