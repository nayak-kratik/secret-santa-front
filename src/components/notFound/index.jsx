import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="container d-flex flex-column align-items-center justify-content-center py-5">
    <div className="text-center">
      <div style={{ fontSize: "5rem" }}>🎅</div>
      <h1 className="display-4 fw-bold text-danger mb-2">
        404 - Lost in the Snow!
      </h1>
      <p className="lead mb-4 text-secondary">
        Oops! Looks like you took a wrong turn on your way to the North Pole.
        <br />
        Even Santa's elves get lost sometimes!
      </p>
      <Link
        to="/"
        className="btn btn-lg text-white  px-4 font-weight-bold btn-danger"
      >
        🎁 Back to Secret Santa Home
      </Link>
    </div>
  </div>
);
