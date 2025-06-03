import { useParams } from "react-router-dom";
import useUsers from "../../common/hooks/user/useUsers";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import ParticipantSelection from "./ParticipantSelection";
import useParticipantSelection from "../../common/hooks/exchanges/useExchangeParticipantSelection";
import useParticipants from "../../common/hooks/participants/useParticipants";
import { useNavigate } from "react-router-dom";

export default function AddParticipants() {
  const { exchangeId } = useParams();
  const navigate = useNavigate();
  // Fetch users and participants
  const { users, loading: usersLoading, error: usersError } = useUsers();

  const {
    participants,
    loading: participantsLoading,
    error: participantsError,
    addParticipants,
  } = useParticipants(exchangeId);

  // Handle participant selection from hooks
  const { selectedUsers, toggleUser, selectAll, clearSelection } =
    useParticipantSelection();

  // Handle adding participants
  const handleAddParticipants = async () => {
    const userIds = Array.from(selectedUsers);
    await addParticipants(userIds);
    clearSelection();
    navigate(`/exchange/${exchangeId}/exclusion`);
  };

  // Filter out participants that are already in the exchange
  const availableUsers = users.filter(
    (user) => !participants.some((p) => p.user.id === user.id)
  );

  if (usersLoading || participantsLoading) {
    return <Loading message="Checking User list..." />;
  }
  if (usersError || participantsError) {
    return <ErrorDisplay />;
  }

  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Add Participants</h1>
        <p className="text-muted">Exchange ID: {exchangeId}</p>
      </div>
      <ParticipantSelection
        users={availableUsers}
        selectedUsers={selectedUsers}
        onSelectUser={toggleUser}
        onSelectAll={() => selectAll(availableUsers.map((u) => u.id))}
        onClearSelection={clearSelection}
      />

      <div className="mt-4">
        {availableUsers.length ? (
          <button
            className="btn  text-white  font-weight-bold btn-success"
            disabled={selectedUsers.size === 0}
            onClick={handleAddParticipants}
          >
            Add Selected Participants ({selectedUsers.size})
          </button>
        ) : (
          <button
            className="btn text-white  font-weight-bold btn-success"
            onClick={() => navigate(`/exchange/${exchangeId}/exclusion`)}
          >
            No more participants available. Continue to Exclusions
          </button>
        )}
      </div>
    </div>
  );
}
