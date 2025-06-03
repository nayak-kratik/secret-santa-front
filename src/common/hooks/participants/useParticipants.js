import { useState, useCallback, useEffect } from "react";
import {
  addParticipantsToExchange,
  fetchAllExchangeParticipants,
} from "../../apis/participant";
import { toast } from "react-toastify";

export default function useParticipants(exchangeId) {
  const [participantState, setParticipantState] = useState({
    participants: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    fetchAllParticipants(exchangeId);
  }, [exchangeId]);

  const fetchAllParticipants = useCallback(async (exchangeId) => {
    if (!exchangeId) {
      toast.error("Exchange ID is required");
      return [];
    }
    setParticipantState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const participants = await fetchAllExchangeParticipants(exchangeId);
      setParticipantState((prev) => ({
        participants: participants.data,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setParticipantState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to fetch participants.",
      }));
    }
  }, []);

  const addParticipants = useCallback(async (userIds) => {
    if (!userIds?.length || !exchangeId) {
      toast.error("User IDs and exchange ID are required");
      return false;
    }

    setParticipantState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await addParticipantsToExchange(userIds, exchangeId);
      toast.success("Participants added to exchange successfully");
      return true;
    } catch (error) {
      const errorMessage =
        error.message || "Failed to add participants to exchange.";
      toast.error(errorMessage);
      setParticipantState((prev) => ({ ...prev, error: errorMessage }));
      return false;
    } finally {
      setParticipantState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  return {
    addParticipants,
    participants: participantState.participants,
    loading: participantState.loading,
    error: participantState.error,
  };
}
