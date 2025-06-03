export const ExclusionItem = ({
  participant,
  otherParticipants,
  isExcluded,
  onToggle,
}) => (
  <div className="card mb-3">
    <div className="card-body">
      <h6 className="card-title mb-3">
        {participant.user?.name || participant.name} cannot be paired with:
      </h6>
      <div className="d-flex flex-wrap gap-3">
        {otherParticipants.map((other) => (
          <div key={other.id} className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              id={`exclude-${participant.id}-${other.id}`}
              checked={isExcluded(participant.id, other.id)}
              onChange={() => onToggle(participant.id, other.id)}
            />
            <label
              className="form-check-label"
              htmlFor={`exclude-${participant.id}-${other.id}`}
            >
              {other.user?.name || other.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);
