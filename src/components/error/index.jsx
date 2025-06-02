import React from "react";
import { Link } from "react-router-dom";

export const ErrorDisplay = ({
  title = "Something went wrong!",
  message = "We're having trouble loading the content. Please try again later.",
}) => (
  <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
    <div className="text-center">
      <div style={{ fontSize: "5rem" }}>🎅</div>
      <h1 className="display-4 fw-bold text-danger mb-2">{title}</h1>
      <p className="lead mb-4 text-secondary">{message}</p>

      <Link
        to="/"
        className="btn btn-lg text-white rounded-pill px-4 font-weight-bold app-btn-bg-color"
      >
        🎁 Back to Secret Santa Home
      </Link>
    </div>
  </div>
);
