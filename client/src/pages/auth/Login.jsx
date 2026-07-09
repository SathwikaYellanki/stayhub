import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import API from "../../services/api";

function Login() {
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
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("residentToken", res.data.token);

      localStorage.setItem(
        "resident",
        JSON.stringify(res.data.resident)
      );

      setMessage("Login Successful!");

      setTimeout(() => {
        navigate("/resident-dashboard");
      }, 1000);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <AuthLayout title="Resident Login">

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
          className="btn btn-success w-100"
        >
          Login
        </button>

      </form>

    </AuthLayout>
  );
}

export default Login;