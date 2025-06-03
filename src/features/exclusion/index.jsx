// src/features/exclusion/index.jsx

import { useParams } from "react-router-dom";
import { useExclusionRules } from "../../common/hooks/exclusion/useExclusionRules";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { ExclusionItem } from "./ExclusionItem";
import useParticipants from "../../common/hooks/participants/useParticipants";

export default function SetExclusionRules() {
  const { id: exchangeId } = useParams();
  const { participants, loading, error } = useParticipants(exchangeId);
  const { exclusions, toggleExclusion, isExcluded } =
    useExclusionRules(exchangeId);

  const handleSave = async () => {
    try {
      console.log("Saving exclusions:", exclusions);
      // Replace with your API call:
      // await api.post('/api/exclusions', exclusions);
      alert("Exclusions saved successfully!");
    } catch (error) {
      console.error("Failed to save exclusions:", error);
      alert("Failed to save exclusions");
    }
  };

  if (loading) return <loading message="Loading participants..." />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Set Exclusion Rules</h1>
        <p className="text-muted">Exchange ID: {exchangeId}</p>
      </div>

      <div className="mb-4">
        {participants.map((participant) => {
          const otherParticipants = participants.filter(
            (p) => p.id !== participant.id
          );
          return (
            <ExclusionItem
              key={participant.id}
              participant={participant}
              otherParticipants={otherParticipants}
              isExcluded={isExcluded}
              onToggle={toggleExclusion}
            />
          );
        })}
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <button className="btn btn-success" onClick={handleSave}>
          Save Exclusion Rules
        </button>
      </div>
    </div>
  );
}
