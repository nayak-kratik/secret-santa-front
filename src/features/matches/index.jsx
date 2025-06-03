import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { useRequireAdmin } from "../../common/hooks/auth/useRedirectIfAdmin";
import useAllAdminMatches from "../../common/hooks/match/useUserMatches";

export default function AllMatches() {
  useRequireAdmin();
  const { matches: exchanges, loading, error } = useAllAdminMatches();

  if (loading) return <Loading message="Loading all matches..." />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="py-4 container">
      <div className="mb-4">
        <h2>Secret Santa Matches</h2>
        <p className="text-muted">View all matches grouped by exchange</p>
      </div>

      {exchanges.length === 0 ? (
        <div className="alert alert-info">No exchanges with matches found.</div>
      ) : (
        <div className="exchanges-list">
          {exchanges.map((exchange) => (
            <div key={exchange.id} className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">{exchange.name}</h3>
                <span className="badge bg-primary">
                  {exchange.matches.length}{" "}
                  {exchange.matches.length === 1 ? "Match" : "Matches"}
                </span>
              </div>

              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Giver</th>
                      <th>Giver Email</th>
                      <th>Receiver</th>
                      <th>Receiver Email</th>
                      <th>Matched On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exchange.matches.map((match, index) => (
                      <tr key={match.id}>
                        <td>{index + 1}</td>
                        <td>{match.giver?.name || "Unknown"}</td>
                        <td>{match.giver?.email || "Unknown"}</td>
                        <td>{match.receiver?.name || "Unknown"}</td>
                        <td>{match.receiver?.email || "N/A"}</td>
                        <td>
                          {new Date(match.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
