import React from "react";
import useLogin from "../../common/hooks/auth/useLogin";
import { useRedirectIfAdmin } from "../../common/hooks/auth/useRedirectIfAdmin";

export default function Login() {
  // Redirect if admin is already logged in
  useRedirectIfAdmin();
  // UseLogin is a custom hook that handles the login process
  const { email, setEmail, handleSubmit, isSubmitting, isDisabled } =
    useLogin();

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4 border-rounded">
        <h2 className="mb-2 text-danger fw-bold fs-4 text-center">
          Welcome on board, Admin 🎅!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-muted small">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg text-white rounded-pill px-4 font-weight-bold app-btn-bg-color w-100"
            disabled={isDisabled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
