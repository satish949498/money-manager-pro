import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          💰 Money Manager
        </Link>

        <div className="d-flex align-items-center">

          <span className="text-white me-3">
            Welcome, Satish
          </span>

          <button className="btn btn-light btn-sm">
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;