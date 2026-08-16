import { INITIAL_TOPICS } from '../../shared/constants.js';
import type {
  Topic,
  GetTopicsResponse,
  HealthCheckResponse,
  SimulationFeedRequest,
  SimulationFeedResponse,
  AnalysisRequest,
  AnalysisResponse,
} from '../../shared/types.js';

export async function fetchHealth(): Promise<HealthCheckResponse> {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error(`Health check failed with status: ${response.status}`);
  }
  return response.json();
}

export async function fetchTopics(): Promise<GetTopicsResponse> {
  try {
    const response = await fetch('/api/topics');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data: GetTopicsResponse = await response.json();
    return data;
  } catch (error) {
    console.warn('Backend API unavailable or network error. Using resilient client fallback:', error);
    // Graceful client fallback using shared constants
    return {
      topics: [...INITIAL_TOPICS],
      source: 'fallback',
      total: INITIAL_TOPICS.length,
    };
  }
}

export async function fetchSimulatedFeed(
  params: SimulationFeedRequest
): Promise<SimulationFeedResponse> {
  const response = await fetch('/api/simulation/feed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to generate simulated feed (HTTP ${response.status})`
    );
  }

  const data: SimulationFeedResponse = await response.json();
  return data;
}

export async function fetchAnalysis(
  params: AnalysisRequest
): Promise<AnalysisResponse> {
  const response = await fetch('/api/analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to analyze perspective diversity (HTTP ${response.status})`
    );
  }

  const data: AnalysisResponse = await response.json();
  return data;
}
