import React from "react";
import { useRequireAdmin } from "../../common/hooks/auth/useRedirectIfAdmin";
import useExchanges from "../../common/hooks/exchanges/useExchanges";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { AddNewExchange } from "./AddNewExchange";

export default function ManageExchanges() {
  // Use on the dashboard page: if not admin, redirect to login (/)
  useRequireAdmin();
  const { exchanges, loading, error, addExchange, removeExchange } =
    useExchanges();

  if (loading) return <Loading message="Checking Exchange list..." />;
  if (error) return <ErrorDisplay />;

  return (
    <div className="container py-5">
      <div className="pb-4">
        <h1 className="pb-2">Manage Exchanges</h1>
        <AddNewExchange onAdd={addExchange} />
      </div>

      <h5 className="mb-4">Existing Exchanges</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {exchanges.map((exchange) => (
          <div key={exchange.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{exchange.name || "No Name"}</h5>
                <p className="card-text text-muted">{exchange.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeExchange(exchange.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
