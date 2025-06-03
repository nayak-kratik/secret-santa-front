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
        ...prev,
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

    try {
      await addParticipantsToExchange(userIds, exchangeId);
      toast.success("Participants added to exchange successfully");
    } catch (error) {
      toast.error(error.message || "Failed to add participants to exchange.");
    }
  }, []);

  return {
    addParticipants,
    participants: participantState.participants,
    loading: participantState.loading,
    error: participantState.error,
  };
}
