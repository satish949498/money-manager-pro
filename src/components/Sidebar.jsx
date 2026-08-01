import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-white shadow p-3"
      style={{
        width: "250px",
        minHeight: "100vh"
      }}
    >

      <h4 className="mb-4 text-primary">
        Dashboard
      </h4>

      <div className="d-grid gap-3">

        <Link
          className="btn btn-outline-primary"
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="btn btn-outline-success"
          to="/add-expense"
        >
          Add Expense
        </Link>

        <Link
          className="btn btn-outline-dark"
          to="/profile"
        >
          Profile
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;