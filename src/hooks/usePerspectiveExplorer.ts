import { useState, useEffect, useCallback } from 'react';
import type {
  PerspectiveDetail,
  SimulatedContentItem,
  Topic,
  GetPerspectivesResponse,
  GetPerspectiveContentResponse,
} from '../../shared/types.js';

export const EXPLORED_PERSPECTIVES_STORAGE_KEY = 'btb_explored_perspectives';

export interface UsePerspectiveExplorerOptions {
  topicId: string | null;
  initialPerspectiveName?: string | null;
}

export interface UsePerspectiveExplorerReturn {
  perspectives: PerspectiveDetail[];
  selectedPerspective: PerspectiveDetail | null;
  representativeContent: SimulatedContentItem[];
  comparisonPerspective: PerspectiveDetail | null;
  exploredPerspectives: string[]; // List of explored perspective names/IDs
  loading: boolean;
  contentLoading: boolean;
  error: string | null;
  selectPerspective: (perspectiveIdentifier: string) => void;
  selectComparison: (perspectiveIdentifier: string | null) => void;
  isExplored: (perspectiveName: string) => boolean;
  refetch: () => void;
}

export function usePerspectiveExplorer({
  topicId,
  initialPerspectiveName,
}: UsePerspectiveExplorerOptions): UsePerspectiveExplorerReturn {
  const [perspectives, setPerspectives] = useState<PerspectiveDetail[]>([]);
  const [selectedPerspective, setSelectedPerspective] = useState<PerspectiveDetail | null>(null);
  const [representativeContent, setRepresentativeContent] = useState<SimulatedContentItem[]>([]);
  const [comparisonPerspective, setComparisonPerspective] = useState<PerspectiveDetail | null>(null);
  const [exploredPerspectives, setExploredPerspectives] = useState<string[]>(() => {
    try {
      const stored = sessionStorage.getItem(EXPLORED_PERSPECTIVES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch available perspectives for the topic
  const fetchPerspectives = useCallback(async () => {
    if (!topicId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/perspectives/${encodeURIComponent(topicId)}`);
      if (!res.ok) {
        throw new Error(`Failed to load perspectives (HTTP ${res.status})`);
      }

      const data: GetPerspectivesResponse = await res.json();
      setPerspectives(data.perspectives || []);

      // Determine initial selection
      if (data.perspectives && data.perspectives.length > 0) {
        let initialMatch = data.perspectives[0];
        if (initialPerspectiveName) {
          const found = data.perspectives.find(
            (p) =>
              p.name.toLowerCase() === initialPerspectiveName.toLowerCase() ||
              p.id.toLowerCase() === initialPerspectiveName.toLowerCase()
          );
          if (found) {
            initialMatch = found;
          }
        }
        setSelectedPerspective(initialMatch);
      }
    } catch (err: any) {
      console.error('Error in usePerspectiveExplorer:', err);
      setError(err.message || 'Unable to retrieve perspectives for this topic.');
    } finally {
      setLoading(false);
    }
  }, [topicId, initialPerspectiveName]);

  useEffect(() => {
    fetchPerspectives();
  }, [fetchPerspectives]);

  // 2. Fetch representative simulated content when selected perspective changes
  useEffect(() => {
    if (!topicId || !selectedPerspective) {
      setRepresentativeContent([]);
      return;
    }

    let isMounted = true;
    const fetchContent = async () => {
      try {
        setContentLoading(true);
        const res = await fetch(
          `/api/perspectives/${encodeURIComponent(topicId)}/${encodeURIComponent(
            selectedPerspective.id || selectedPerspective.name
          )}/content`
        );

        if (!res.ok) {
          throw new Error(`Failed to load representative content (HTTP ${res.status})`);
        }

        const data: GetPerspectiveContentResponse = await res.json();
        if (isMounted) {
          setRepresentativeContent(data.items || []);
        }
      } catch (err) {
        console.error('Error loading perspective content:', err);
        if (isMounted) {
          setRepresentativeContent([]);
        }
      } finally {
        if (isMounted) {
          setContentLoading(false);
        }
      }
    };

    fetchContent();

    // Mark as explored
    if (selectedPerspective?.name) {
      setExploredPerspectives((prev) => {
        if (prev.includes(selectedPerspective.name)) {
          return prev;
        }
        const updated = [...prev, selectedPerspective.name];
        try {
          sessionStorage.setItem(EXPLORED_PERSPECTIVES_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore storage quota error
        }
        return updated;
      });
    }

    return () => {
      isMounted = false;
    };
  }, [topicId, selectedPerspective]);

  // Select perspective handler
  const selectPerspective = useCallback(
    (identifier: string) => {
      const match = perspectives.find(
        (p) =>
          p.id === identifier ||
          p.name.toLowerCase() === identifier.toLowerCase() ||
          p.id.toLowerCase() === identifier.toLowerCase()
      );
      if (match) {
        setSelectedPerspective(match);
        // Clear comparison if it matches the new selected perspective
        if (comparisonPerspective?.id === match.id) {
          setComparisonPerspective(null);
        }
      }
    },
    [perspectives, comparisonPerspective]
  );

  // Select comparison perspective handler
  const selectComparison = useCallback(
    (identifier: string | null) => {
      if (!identifier) {
        setComparisonPerspective(null);
        return;
      }
      const match = perspectives.find(
        (p) =>
          p.id === identifier ||
          p.name.toLowerCase() === identifier.toLowerCase() ||
          p.id.toLowerCase() === identifier.toLowerCase()
      );
      if (match && match.id !== selectedPerspective?.id) {
        setComparisonPerspective(match);
      } else {
        setComparisonPerspective(null);
      }
    },
    [perspectives, selectedPerspective]
  );

  const isExplored = useCallback(
    (perspectiveName: string) => {
      return exploredPerspectives.some(
        (exp) => exp.toLowerCase() === perspectiveName.toLowerCase()
      );
    },
    [exploredPerspectives]
  );

  return {
    perspectives,
    selectedPerspective,
    representativeContent,
    comparisonPerspective,
    exploredPerspectives,
    loading,
    contentLoading,
    error,
    selectPerspective,
    selectComparison,
    isExplored,
    refetch: fetchPerspectives,
  };
}
