import { useParams } from "react-router-dom";
import useUsers from "../../common/hooks/user/useUsers";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import UserSelection from "./UserSelection";
import useParticipantSelection from "../../common/hooks/exchanges/useExchangeParticipantSelection";

export default function AddParticipants() {
  const { id: exchangeId } = useParams();
  const { users, loading, error } = useUsers();
  const { selectedUsers, toggleUser, selectAll, clearSelection, isSelected } =
    useParticipantSelection();

  if (loading) return <Loading message="Checking User list..." />;
  if (error) return <ErrorDisplay />;

  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Add Participants</h1>
        <p className="text-muted">Exchange ID: {exchangeId}</p>
      </div>

      <UserSelection
        users={users}
        selectedUsers={selectedUsers}
        onSelectUser={toggleUser}
        onSelectAll={selectAll}
        onClearSelection={clearSelection}
      />

      <div className="mt-4">
        <button
          className="btn btn-primary"
          disabled={selectedUsers.size === 0}
          // onClick={handleAddParticipants}
        >
          Add Selected Participants ({selectedUsers.size})
        </button>
      </div>
    </div>
  );
}
