import React from "react";
import { Card, CardBody, CardTitle, CardText, Badge } from "react-bootstrap";

const MatchList = ({ matches = [], participants = [] }) => {
  // Create a map of participant IDs to their details for easy lookup
  const participantMap = new Map(participants.map((p) => [p.id, p]));

  if (matches.length === 0) {
    return (
      <div className="alert alert-info">
        No matches have been generated yet. Please generate matches from the
        exclusions page.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {matches.map((match, index) => {
        const giver = participantMap.get(match.giver_id);
        const receiver = participantMap.get(match.receiver_id);

        if (!giver || !receiver) return null;

        return (
          <div key={index} className="col-md-6 col-lg-4">
            <Card className="h-100 shadow-sm">
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                    <i className="bi bi-gift-fill text-primary fs-4"></i>
                  </div>
                  <div>
                    <CardTitle className="mb-0">
                      {giver.user?.name || "Unknown Giver"}
                    </CardTitle>
                    <small className="text-muted">Giver</small>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                    <i className="bi bi-person-heart text-success fs-4"></i>
                  </div>
                  <div>
                    <CardText className="mb-0">
                      <strong>
                        {receiver.user?.name || "Unknown Receiver"}
                      </strong>
                    </CardText>
                    <small className="text-muted">Receiver</small>
                    {receiver.user?.email && (
                      <div className="mt-1">
                        <Badge
                          bg="light"
                          text="dark"
                          className="text-wrap text-start"
                        >
                          <i className="bi bi-envelope me-1"></i>
                          {receiver.user.email}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;
