import React from "react";
import useUsers from "../../common/hooks/user/useUsers";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { AddNewUser } from "./AddNewUser";

export default function ManageUsers() {
  const { users, loading, error, addUser, removeUser } = useUsers();

  if (loading) return <Loading message="Checking User list..." />;
  if (error) return <ErrorDisplay />;

  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Manage Users</h1>
        <AddNewUser onAdd={addUser} />
      </div>

      <h5 className="mb-4">Existing Users</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {users.length === 0 ? (
          <div className="alert alert-info">
            No users found for your account. Add new user to get started.
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name || "No Name"}</h5>
                  <p className="card-text text-muted">{user.email}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
