import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setProfile(res.data.user);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load profile"
      );
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    setProfileLoading(true);

    try {
      const res = await API.put(
        "/users/profile",
        profile
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Profile Updated Successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Profile Update Failed"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    setPasswordLoading(true);

    try {
      await API.put(
        "/users/change-password",
        passwordData
      );

      toast.success("Password Changed Successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Password Change Failed"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container py-5">

          <div
            className="card shadow-lg border-0 mx-auto"
            style={{
              maxWidth: "700px",
              borderRadius: "18px",
            }}
          >
            <div className="card-body p-5">

              <h2 className="text-center mb-4">
                👤 My Profile
              </h2>
                            {/* Profile Form */}

              <form onSubmit={updateProfile}>

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    required
                  />

                </div>

                <button
                  className="btn btn-primary w-100"
                  disabled={profileLoading}
                >
                  {profileLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>

              </form>

              <hr className="my-5" />

              <h3 className="text-center mb-4">
                🔒 Change Password
              </h3>

              <form onSubmit={changePassword}>

                <div className="mb-3">

                  <label className="form-label">
                    Current Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    New Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />

                </div>

                <button
                  className="btn btn-danger w-100"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Changing Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

    </>
  );
}

export default Profile;