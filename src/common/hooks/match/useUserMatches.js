import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { getAllAdminMatches } from "../../apis/match";
import { getCookie } from "../../utils/cookie";

export const useAllMatches = () => {
  const [matchState, setMatchState] = useState({
    matches: [],
    loading: false,
    error: null,
  });

  const fetchAdminMatches = useCallback(async () => {
    const adminId = getCookie("adminId");

    setMatchState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await getAllAdminMatches(adminId);
      setMatchState({
        matches: response.data || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error fetching user matches:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to load your matches";

      setMatchState({
        matches: [],
        loading: false,
        error: errorMessage,
      });

      toast.error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchAdminMatches();
  }, [fetchAdminMatches]);

  return {
    ...matchState,
  };
};

export default useAllMatches;
