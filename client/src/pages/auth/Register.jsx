import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import API from "../../services/api";

function Register() {
  const navigate = useNavigate();

  // Registration Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    flatNo: "",
  });

  const [message, setMessage] = useState("");

  // Check Status
  const [checkEmail, setCheckEmail] = useState("");
  const [status, setStatus] = useState("");
  const [passwordCreated, setPasswordCreated] = useState(false);

  // Registration Form Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Register Resident
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      setMessage(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        flatNo: "",
      });

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  // Check Approval Status
  const checkStatus = async () => {
    try {
      const res = await API.post("/auth/check-status", {
        email: checkEmail,
      });

      setStatus(res.data.status);
      setPasswordCreated(res.data.isPasswordCreated);

    } catch (err) {
      setStatus("");
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <AuthLayout title="Resident Registration">

      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      {/* Registration Form */}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Name</label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
          <label>Phone</label>

          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Flat Number</label>

          <input
            type="text"
            className="form-control"
            name="flatNo"
            value={formData.flatNo}
            onChange={handleChange}
            required
          />
        </div>

<button
  type="submit"
  className="btn btn-success w-100"
>
  Request Registration
</button>
      </form>

      <hr className="my-4" />

      {/* Check Status */}

      <h5>Already Registered?</h5>

      <div className="mb-3">

        <label>Enter Registered Email</label>

        <input
          type="email"
          className="form-control"
          value={checkEmail}
          onChange={(e) => setCheckEmail(e.target.value)}
        />

      </div>

      <button
        className="btn btn-secondary"
        onClick={checkStatus}
      >
        Check Status
      </button>

      <br />
      <br />

      {status === "Pending" && (
        <div className="alert alert-warning">
          ⏳ Your registration is waiting for Admin approval.
        </div>
      )}

      {status === "Rejected" && (
        <div className="alert alert-danger">
          ❌ Your registration has been rejected.
        </div>
      )}

      {status === "Approved" && !passwordCreated && (
        <div className="alert alert-success">

          <h6>✅ Congratulations!</h6>

          <p>Your registration has been approved.</p>

          <button
            className="btn btn-success"
            onClick={() =>
              navigate("/create-password", {
                state: {
                  email: checkEmail,
                },
              })
            }
          >
            Create Password
          </button>

        </div>
      )}

      {status === "Approved" && passwordCreated && (
        <div className="alert alert-primary">

          <h6>Password already created.</h6>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Resident Login
          </button>

        </div>
      )}

    </AuthLayout>
  );
}

export default Register;