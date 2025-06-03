import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { Container, Table, Button } from "react-bootstrap";
import useAllAdminMatches from "../../common/hooks/match/useUserMatches";

export default function ViewMatch() {
  const { userId } = useParams();
  const { matches, loading, error, refresh } = useAllAdminMatches(userId);

  if (loading) return <Loading message="Loading your matches..." />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="py-4 container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Secret Santa Matches</h2>
        <Button variant="outline-primary" onClick={refresh}>
          Refresh
        </Button>
      </div>

      {matches.length === 0 ? (
        <div className="alert alert-info">
          No matches found for your account.
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Exchange</th>
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
                  <td>{match.exchange?.name || "N/A"}</td>
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
    </div>
  );
}
