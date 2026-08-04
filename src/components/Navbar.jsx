import { Link, useNavigate } from "react-router-dom";
import { FaWallet, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Logout",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm px-2 px-md-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center m-0"
          to="/dashboard"
        >
          <FaWallet className="text-warning me-2 fs-4" />

          <span
            className="fw-bold text-truncate"
            style={{ maxWidth: "180px" }}
          >
            Money Manager Pro
          </span>
        </Link>

        {/* Right Section */}
        <div className="d-flex align-items-center">

          {/* User */}
          <div className="d-flex align-items-center text-white me-2 me-md-4">

            <FaUserCircle
              className="text-info"
              size={24}
            />

            <span className="ms-2 fw-semibold d-none d-sm-inline">
              {user?.name}
            </span>

          </div>

          {/* Logout */}
          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            <span className="ms-2 d-none d-md-inline">
              Logout
            </span>
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;