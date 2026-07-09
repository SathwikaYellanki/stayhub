import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import API from "../../services/api";

function CreatePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const passedEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: passedEmail,
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await API.post("/auth/create-password", {
        email: formData.email,
        password: formData.password,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <AuthLayout title="Create Password">

      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={passedEmail !== ""}
            required
          />
        </div>

        <div className="mb-3">
          <label>New Password</label>

          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
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
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
        >
          Create Password
        </button>

      </form>

    </AuthLayout>
  );
}

export default CreatePassword;