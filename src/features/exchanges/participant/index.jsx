import { useParams } from "react-router-dom";
import useUsers from "../../../common/hooks/user/useUsers";
import { Loading } from "../../../components/loading";
import { ErrorDisplay } from "../../../components/error";
import ParticipantSelection from "./ParticipantSelection";
import useParticipantSelection from "../../../common/hooks/exchanges/useExchangeParticipantSelection";
import useParticipants from "../../../common/hooks/participants/useParticipants";
import { useNavigate } from "react-router-dom";

export default function AddParticipants() {
  const { id: exchangeId } = useParams();
  const { users, loading, error } = useUsers();
  const {
    selectedUsers,
    toggleUser,
    selectAll,
    clearSelection,
    isOddParticipants,
    isMinParticipants,
  } = useParticipantSelection();
  const { addParticipants } = useParticipants();
  const navigate = useNavigate();

  const handleAddParticipants = async () => {
    const userIds = Array.from(selectedUsers);

    const success = await addParticipants(userIds, exchangeId);
    if (success) {
      navigate(`/exchange/${exchangeId}`);
    }
  };

  if (loading) return <Loading message="Checking User list..." />;
  if (error) return <ErrorDisplay />;

  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Add Participants</h1>
        <p className="text-muted">Exchange ID: {exchangeId}</p>
      </div>
      <ParticipantSelection
        users={users}
        selectedUsers={selectedUsers}
        onSelectUser={toggleUser}
        onSelectAll={selectAll}
        onClearSelection={clearSelection}
      />

      <div className="mt-4">
        <button
          className="btn  text-white  font-weight-bold btn-success"
          disabled={
            selectedUsers.size === 0 || isOddParticipants || isMinParticipants
          }
          onClick={handleAddParticipants}
        >
          Add Selected Participants ({selectedUsers.size})
        </button>
        {(isOddParticipants || isMinParticipants) && (
          <span className="text-danger mx-3">
            Odd or less than 3 participants selected.
          </span>
        )}
      </div>
    </div>
  );
}
