import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRequireAdmin } from "../../common/hooks/auth/useRedirectIfAdmin";
import { Loading } from "../../components/loading";
import { ErrorDisplay } from "../../components/error";
import { toast } from "react-toastify";
import { api } from "../../common/apis/api";
import MatchList from "./MatchList";
import { Button } from "react-bootstrap";

export default function ManageMatches() {
  useRequireAdmin();
  const { id: exchangeId } = useParams();
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch matches
        const matchesResponse = await api.get(
          `/exchanges/${exchangeId}/matches`
        );
        setMatches(matchesResponse.data || []);

        // Fetch participants
        const participantsResponse = await api.get(
          `/exchanges/${exchangeId}/participants`
        );
        setParticipants(participantsResponse.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load matches");
        toast.error("Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    if (exchangeId) {
      fetchData();
    }
  }, [exchangeId]);

  const handleGenerateMatches = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        `/exchanges/${exchangeId}/generate-matches`
      );
      setMatches(response.data || []);
      toast.success("Matches generated successfully!");
    } catch (err) {
      console.error("Error generating matches:", err);
      toast.error(err.response?.data?.message || "Failed to generate matches");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Loading matches..." />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Secret Santa Matches</h1>
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => window.history.back()}
            className="me-2"
          >
            <i className="bi bi-arrow-left me-1"></i> Back
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerateMatches}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Generating...
              </>
            ) : (
              <>
                <i className="bi bi-shuffle me-1"></i> Generate Matches
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          These are the Secret Santa assignments. Each person will only see who
          they are giving a gift to.
        </div>
      </div>

      <MatchList matches={matches} participants={participants} />
    </div>
  );
}
