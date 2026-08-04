import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  return (
    <div
      className="bg-white shadow p-3 d-none d-md-block"
      style={{
        width: "250px",
        minHeight: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <h4 className="mb-4 text-primary fw-bold">
        Dashboard
      </h4>

      <div className="d-grid gap-3">

        <Link
          className={`btn ${
            location.pathname === "/dashboard"
              ? "btn-primary"
              : "btn-outline-primary"
          } d-flex align-items-center justify-content-start`}
          to="/dashboard"
        >
          <FaTachometerAlt className="me-2" />
          Dashboard
        </Link>

        <Link
          className={`btn ${
            location.pathname === "/add-expense"
              ? "btn-success"
              : "btn-outline-success"
          } d-flex align-items-center justify-content-start`}
          to="/add-expense"
        >
          <FaPlusCircle className="me-2" />
          Add Expense
        </Link>

        <Link
          className={`btn ${
            location.pathname === "/profile"
              ? "btn-dark"
              : "btn-outline-dark"
          } d-flex align-items-center justify-content-start`}
          to="/profile"
        >
          <FaUserCircle className="me-2" />
          Profile
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;