// src/features/exchanges/exclusion/hooks/useExclusionRules.js
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export const useExclusionRules = (participants = []) => {
  const [exclusions, setExclusions] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Toggle exclusion for a participant
  const toggleExclusion = useCallback((participantId, excludedId) => {
    setExclusions((prev) => {
      const currentExclusions = prev[participantId] || [];
      const newExclusions = currentExclusions.includes(excludedId)
        ? currentExclusions.filter((id) => id !== excludedId)
        : [...currentExclusions, excludedId];

      return {
        ...prev,
        [participantId]: newExclusions,
      };
    });
  }, []);

  // Save exclusions to the server
  const saveExclusions = useCallback(async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      toast.success("Exclusion rules saved successfully");
      return true;
    } catch (error) {
      console.error("Failed to save exclusions:", error);
      toast.error("Failed to save exclusion rules");
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [exclusions]);

  return {
    exclusions,
    toggleExclusion,
    saveExclusions,
    isSaving,
  };
};
