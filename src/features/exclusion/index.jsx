import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import useParticipants from "../../common/hooks/participants/useParticipants";
import { ExclusionItem } from "./ExclusionItem";
import { useExclusionRules } from "../../common/hooks/exclusion/useExclusionRules";

export default function SetExclusionRules() {
  const { id: exchangeId } = useParams();
  const { participants, loading, error } = useParticipants(exchangeId);
  const { exclusions, toggleExclusion, saveExclusions, isSaving } =
    useExclusionRules(participants);

  if (loading) return <Loading message="Loading participants..." />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Set Exclusion Rules</h1>
        <p className="text-muted">Exchange ID: {exchangeId}</p>
        <p className="text-muted">
          Select participants who should not be paired with each other
        </p>
      </div>

      <div className="mb-4">
        {participants.map((participant) => (
          <ExclusionItem
            key={participant.id}
            participant={participant}
            allParticipants={participants}
            selectedExclusions={exclusions[participant.id] || []}
            onExclusionChange={toggleExclusion}
          />
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <button
          className="btn btn-success"
          // onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Exclusion Rules"}
        </button>
      </div>
    </div>
  );
}
