import React from "react";
import { useParams } from "react-router-dom";
import { useRequireAdmin } from "../../common/hooks/auth/useRedirectIfAdmin";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { Container, Table } from "react-bootstrap";
import { useMatch } from "../../common/hooks/match/useMatch";

export default function ManageMatches() {
  useRequireAdmin();
  const { id: exchangeId } = useParams();
  const { matches, loading, error } = useMatch(exchangeId);

  if (loading) return <Loading message="Loading matches..." />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        Secret Santa Matches for the exchange {exchangeId}
      </h2>

      {matches.length === 0 ? (
        <div className="alert alert-info">
          No matches have been generated yet.
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Giver</th>
                <th>Giver Email</th>
                <th>Receiver</th>
                <th>Receiver Email</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={match.id}>
                  <td>{index + 1}</td>
                  <td>{match.giver?.name || "Unknown"}</td>
                  <td>{match.giver?.email || "Unknown"}</td>
                  <td>{match.receiver?.name || "Unknown"}</td>
                  <td>{match.receiver?.email || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
