import { useEffect, useState } from "react";
import API from "../../services/api";
import ResidentSidebar from "../../components/resident/ResidentSidebar";
import ResidentTopbar from "../../components/resident/ResidentTopbar";

function Profile() {

  const resident = JSON.parse(localStorage.getItem("resident"));

  const [profile, setProfile] = useState({});

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchProfile = async () => {
    try {

      const res = await API.get(
        `/auth/profile/${resident.id}`
      );

      setProfile(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async (e) => {

    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    try {

      const res = await API.put(
        "/auth/change-password",
        {
          residentId: resident.id,
          currentPassword:
            passwordData.currentPassword,
          newPassword:
            passwordData.newPassword,
        }
      );

      alert(res.data.message);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );

    }

  };

  return (
    <div className="d-flex">

      <ResidentSidebar />

      <div className="flex-grow-1">

        <ResidentTopbar />

        <div className="container mt-4">

          <h2>My Profile</h2>

          <div className="card p-4 mb-4">

            <h5>Name</h5>
            <p>{profile.name}</p>

            <h5>Email</h5>
            <p>{profile.email}</p>

            <h5>Phone</h5>
            <p>{profile.phone}</p>

            <h5>Flat Number</h5>
            <p>{profile.flatNo}</p>

            <h5>Status</h5>

            <span className="badge bg-success">
              {profile.status}
            </span>

          </div>

          <div className="card p-4">

            <h3>Change Password</h3>

            <form onSubmit={changePassword}>

              <div className="mb-3">

                <label>Current Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>New Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Confirm Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>

              <button className="btn btn-primary">
                Update Password
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;