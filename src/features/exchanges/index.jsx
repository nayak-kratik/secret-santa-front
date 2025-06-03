import React from "react";
import useExchanges from "../../common/hooks/exchanges/useExchanges";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { AddNewExchange } from "./AddNewExchange";
import { useNavigate } from "react-router-dom";

export default function ManageExchanges() {
  const navigate = useNavigate();
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
        {exchanges.length === 0 ? (
          <div className="alert alert-info">
            No exchanges found for your account.
          </div>
        ) : (
          exchanges.map((exchange) => (
            <div key={exchange.id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">
                      {exchange.name || "No Name"}
                      <small className="text-muted">
                        {" "}
                        ({`Id: ${exchange.id}`})
                      </small>
                    </h5>
                    <h5 className="card-text text-muted ">
                      Budget: ${exchange.budget}
                    </h5>
                  </div>
                  <p className="card-text text-muted">{exchange.description}</p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => removeExchange(exchange.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success m-1"
                      onClick={() =>
                        navigate(`/exchange/${exchange.id}/add-participants`)
                      }
                    >
                      Add Participants
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
