export const Header = () => (
  <header className="sticky-top bg-light border-bottom">
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <div style={{ fontSize: "2rem" }}>🎅</div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Manage Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/exchanges">
                Manage Exchanges
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/matches">
                Manage Matches
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
