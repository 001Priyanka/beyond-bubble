import { useState, useEffect, useCallback } from 'react';
import { fetchTopics } from '../services/api.js';
import type { Topic } from '../../shared/types.js';

interface UseTopicsResult {
  topics: Topic[];
  loading: boolean;
  error: string | null;
  source: 'database' | 'fallback' | null;
  refetch: () => Promise<void>;
}

export function useTopics(): UseTopicsResult {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'database' | 'fallback' | null>(null);

  const loadTopics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopics();
      setTopics(data.topics);
      setSource(data.source);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load topics';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  return {
    topics,
    loading,
    error,
    source,
    refetch: loadTopics,
  };
}
