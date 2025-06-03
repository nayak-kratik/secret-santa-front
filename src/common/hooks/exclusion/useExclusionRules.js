import { useState, useCallback } from "react";
import { addExclusionRule } from "../../apis/exclusion";
import { toast } from "react-toastify";

export const useExclusionRules = (exchangeId) => {
  const [exclusions, setExclusions] = useState([]);

  // Add or remove an exclusion
  const addOrRemoveExclusion = useCallback(
    (participantId, excludedId) => {
      setExclusions((currentExclusions) => {
        // Create a new exclusion object
        const newExclusion = {
          gift_exchange_id: parseInt(exchangeId, 10),
          participant_id: parseInt(participantId, 10),
          excluded_participant_id: parseInt(excludedId, 10),
        };

        // Check if this exclusion already exists
        const exists = currentExclusions.some(
          (e) =>
            e.participant_id === newExclusion.participant_id &&
            e.excluded_participant_id === newExclusion.excluded_participant_id
        );
        // If it exists, remove it. If not, add it.
        return exists
          ? currentExclusions.filter(
              (e) =>
                !(
                  e.participant_id === newExclusion.participant_id &&
                  e.excluded_participant_id ===
                    newExclusion.excluded_participant_id
                )
            )
          : [...currentExclusions, newExclusion];
      });
    },
    [exchangeId]
  );

  const isExcluded = useCallback(
    (participantId, excludedId) => {
      return exclusions.some(
        (e) =>
          e.participant_id === parseInt(participantId) &&
          e.excluded_participant_id === parseInt(excludedId)
      );
    },
    [exclusions]
  );

  const saveExclusions = useCallback(async (exclusions) => {
    if (!exclusions?.length) {
      toast.error("No exclusions provided");
      return false;
    }

    try {
      await addExclusionRule(exclusions);
      toast.success("Generating Matches");
    } catch (error) {
      toast.error(error.message || "Failed to save exclusions");
    }
  }, []);

  return {
    exclusions,
    addOrRemoveExclusion,
    isExcluded,
    saveExclusions,
  };
};
