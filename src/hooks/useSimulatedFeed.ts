import { useState, useEffect, useCallback } from 'react';
import { fetchSimulatedFeed } from '../services/api.js';
import type {
  SimulationFeedRequest,
  SimulationFeedResponse,
} from '../../shared/types.js';

export interface UseSimulatedFeedResult {
  data: SimulationFeedResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSimulatedFeed(params: SimulationFeedRequest | null): UseSimulatedFeedResult {
  const [data, setData] = useState<SimulationFeedResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFeed = useCallback(async () => {
    if (!params || !params.topicId) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchSimulatedFeed(params);
      setData(response);
    } catch (err: any) {
      console.error('Failed to load simulated feed:', err);
      setError(err.message || 'Unable to retrieve simulated environment content.');
    } finally {
      setLoading(false);
    }
  }, [
    params?.topicId,
    params?.selectedContentFormats?.join(','),
    params?.selectedAttentionTypes?.join(','),
  ]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  return {
    data,
    loading,
    error,
    refetch: loadFeed,
  };
}
