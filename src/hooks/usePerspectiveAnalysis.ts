import { useState, useEffect, useCallback } from 'react';
import { fetchAnalysis } from '../services/api.js';
import { computeClientAnalysis } from '../utils/analysis.js';
import type {
  SimulationFeedResponse,
  AnalysisResponse,
} from '../../shared/types.js';

export interface UsePerspectiveAnalysisResult {
  data: AnalysisResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePerspectiveAnalysis(
  simulationData: SimulationFeedResponse | null
): UsePerspectiveAnalysisResult {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(async () => {
    if (!simulationData || !simulationData.feed) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Primary: Hit the backend API
      const result = await fetchAnalysis({
        simulationId: simulationData.simulationId,
        feed: simulationData.feed,
      });
      setData(result);
    } catch (err: any) {
      console.warn('Backend /api/analysis error, falling back to deterministic client computation:', err);
      try {
        // Resilient deterministic client fallback
        const clientResult = computeClientAnalysis({
          simulationId: simulationData.simulationId,
          feed: simulationData.feed,
        });
        setData(clientResult);
      } catch (clientErr: any) {
        setError(err.message || 'Failed to compute perspective diversity score.');
      }
    } finally {
      setLoading(false);
    }
  }, [simulationData]);

  useEffect(() => {
    runAnalysis();
  }, [runAnalysis]);

  return {
    data,
    loading,
    error,
    refetch: runAnalysis,
  };
}
