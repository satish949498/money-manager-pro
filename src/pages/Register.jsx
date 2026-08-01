import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="center-screen">
      <div className="card shadow-card p-4" style={{ width: 400 }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <input className="form-control mb-3" placeholder="Full Name" />

        <input
          className="form-control mb-3"
          placeholder="Email"
          type="email"
        />

        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
        />

        <input
          className="form-control mb-3"
          placeholder="Confirm Password"
          type="password"
        />

        <button className="btn btn-success w-100">
          Register
        </button>

        <p className="text-center mt-3">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;