import React from "react";

export default function UserSelection({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onClearSelection,
}) {
  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between mb-4">
        <h5>Available Users</h5>
        <div>
          <button
            className="btn btn-sm btn-outline-success me-2"
            onClick={() => onSelectAll(users.map((u) => u.id))}
          >
            Select All
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={onClearSelection}
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="col"
            onClick={() => onSelectUser(user.id)}
            style={{ cursor: "pointer" }}
          >
            <div
              className={`card h-100 ${
                selectedUsers.has(user.id) ? "border-success border-2" : ""
              }`}
            >
              <div className="card-body">
                <h6 className="card-title mb-1">{user.name || "No Name"}</h6>
                <small className="text-muted">{user.email}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
