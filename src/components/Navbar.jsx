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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">

        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/dashboard"
        >
          <FaWallet className="me-2 text-warning" />
          Money Manager Pro
        </Link>

        <div className="d-flex align-items-center">

          <div className="me-4 text-white d-flex align-items-center">

            <FaUserCircle size={22} className="me-2 text-info" />

            <span className="fw-semibold">
              {user?.name}
            </span>

          </div>

          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;