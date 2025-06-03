import { useParams } from "react-router-dom";
import { Loading } from "../../../components/loading";
import { ErrorDisplay } from "../../../components/error";
import useParticipants from "../../../common/hooks/participants/useParticipants";

export default function SetExclusionRules() {
  const { id: exchangeId } = useParams();
  const { participants, loading, error } = useParticipants(exchangeId);
  if (loading) return <Loading message="Checking User list..." />;
  if (error) return <ErrorDisplay />;
  console.log({ participants });
  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Set Exclusion Rules</h1>
        <p className="text-muted">Exchange ID: {exchangeId}</p>
      </div>

      {/* <div className="mt-4">
        <button
          className="btn  text-white  font-weight-bold btn-success"
          disabled={selectedUsers.size === 0}
          onClick={handleAddParticipants}
        >
          Set Exclusion Rules ({selectedUsers.size})
        </button>
      </div> */}
    </div>
  );
}
