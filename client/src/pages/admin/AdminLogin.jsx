import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import API from "../../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const res = await API.post("/auth/admin-login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      setMessage("Login Successful!");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <AuthLayout title="Admin Login">

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
            required
          />

        </div>

        <div className="mb-3">

          <label>Password</label>

          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

        </div>

        <button
          type="submit"
          className="btn btn-danger w-100"
        >
          Login
        </button>

      </form>

    </AuthLayout>
  );
}

export default AdminLogin;