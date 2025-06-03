// src/features/exchanges/exclusion/components/ExclusionItem.jsx
import React from "react";

export const ExclusionItem = ({
  participant,
  allParticipants,
  selectedExclusions = [],
  onExclusionChange,
}) => {
  // Filter out the current participant from the exclusion list
  const availableExclusions = allParticipants.filter(
    (p) => p.id !== participant.id
  );

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-title mb-3">
          {participant.user?.name || participant.name || "Unknown User"} cannot
          be paired with:
        </h6>
        <div className="d-flex flex-wrap gap-2">
          {availableExclusions.map((otherParticipant) => (
            <div key={otherParticipant.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`exclude-${participant.id}-${otherParticipant.id}`}
                checked={selectedExclusions.includes(otherParticipant.id)}
                onChange={() =>
                  onExclusionChange(participant.id, otherParticipant.id)
                }
              />
              <label
                className="form-check-label"
                htmlFor={`exclude-${participant.id}-${otherParticipant.id}`}
              >
                {otherParticipant.user?.name ||
                  otherParticipant.name ||
                  "Unknown User"}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
