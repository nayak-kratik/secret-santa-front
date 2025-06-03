import { useParams } from "react-router-dom";
import { useExclusionRules } from "../../common/hooks/exclusion/useExclusionRules";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { ExclusionItem } from "./ExclusionItem";
import useParticipants from "../../common/hooks/participants/useParticipants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SetExclusionRules() {
  const navigate = useNavigate();
  const { id: exchangeId } = useParams();
  const { participants, loading, error } = useParticipants(exchangeId);
  const { exclusions, addOrRemoveExclusion, isExcluded, saveExclusions } =
    useExclusionRules(exchangeId);

  const handleSave = async () => {
    try {
      await saveExclusions(exclusions);
      toast.success("Exclusions saved successfully!");
      navigate(`/exchange/${exchangeId}/matches`);
    } catch (error) {
      toast.error("Failed to save exclusions");
    }
  };

  if (loading) return <Loading message="Loading participants..." />;
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
              onToggle={addOrRemoveExclusion}
            />
          );
        })}
      </div>

      <div className="d-flex justify-content-start">
        <button
          className="btn btn-danger me-2"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <button className="btn btn-success me-2" onClick={handleSave}>
          Save Exclusion Rules and Generate Matches
        </button>
      </div>
    </div>
  );
}
