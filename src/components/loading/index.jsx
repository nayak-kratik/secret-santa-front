import React from "react";

export const Loading = ({ message = "Loading..." }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-5">
    <div className="spinner-border text-danger">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2 text-muted">{message}</p>
  </div>
);

export const LoadingSmall = () => (
  <div className="spinner-border spinner-border-sm text-danger">
    <span className="visually-hidden">Loading...</span>
  </div>
);
