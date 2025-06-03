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
    <div className="container d-flex align-items-center justify-content-center py-5">
      <div className="card shadow p-4 border-rounded">
        <h2 className="mb-4 text-danger fw-bold fs-4 text-center">
          Welcome on board, Admin. 🎁
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control "
              id="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg text-white  px-4 font-weight-bold btn-success w-100"
            disabled={isDisabled}
          >
            Login or Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
