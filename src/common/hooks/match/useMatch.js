import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { getMatches } from "../../apis/match";

export const useMatch = (exchangeId) => {
  const [matchState, setMatchState] = useState({
    matches: [],
    loading: false,
    error: null,
  });

  const fetchMatches = useCallback(async () => {
    if (!exchangeId) return;

    setMatchState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await getMatches(exchangeId);
      setMatchState({
        matches: response.data || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setMatchState({
        matches: [],
        loading: false,
        error: err.message || "Failed to load matches",
      });
    }
  }, [exchangeId]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return {
    ...matchState,
  };
};

export default useMatch;
