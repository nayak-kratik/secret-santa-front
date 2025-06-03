import { useState, useCallback } from "react";

export const useExclusionRules = (exchangeId) => {
  const [exclusions, setExclusions] = useState([]);

  // Add or remove an exclusion
  const toggleExclusion = useCallback(
    (participantId, excludedId) => {
      setExclusions((prev) => {
        const exists = prev.some(
          (e) =>
            e.participant_id === participantId &&
            e.excluded_participant_id === excludedId
        );

        if (exists) {
          return prev.filter(
            (e) =>
              !(
                e.participant_id === participantId &&
                e.excluded_participant_id === excludedId
              )
          );
        }

        return [
          ...prev,
          {
            gift_exchange_id: parseInt(exchangeId, 10),
            participant_id: parseInt(participantId, 10),
            excluded_participant_id: parseInt(excludedId, 10),
          },
        ];
      });
    },
    [exchangeId]
  );

  const isExcluded = useCallback(
    (participantId, excludedId) => {
      return exclusions.some(
        (e) =>
          e.participant_id === participantId &&
          e.excluded_participant_id === excludedId
      );
    },
    [exclusions]
  );

  return {
    exclusions,
    toggleExclusion,
    isExcluded,
  };
};
