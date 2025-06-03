import { useState, useCallback } from "react";
import { addParticipantsToExchange } from "../../apis/participant";
import { toast } from "react-toastify";

export default function useParticipants() {
  const [participantState, setParticipantState] = useState({
    loading: false,
    error: null,
  });

  const addParticipants = useCallback(async (userIds, exchangeId) => {
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
        error.response?.data?.message ||
        "Failed to add participants to exchange";
      toast.error(errorMessage);
      setParticipantState((prev) => ({ ...prev, error: errorMessage }));
      return false;
    } finally {
      setParticipantState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  return {
    addParticipants,
    loading: participantState.loading,
    error: participantState.error,
  };
}
