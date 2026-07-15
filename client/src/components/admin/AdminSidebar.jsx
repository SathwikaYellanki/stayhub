import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      className="bg-dark text-white"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <div className="p-4">

        <h3 className="mb-4">
          🏢 StayHub
        </h3>

        <ul className="nav flex-column">

          <li className="nav-item mb-3">
            <Link className="nav-link text-white" to="/admin-dashboard">
              📊 Dashboard
            </Link>

            <Link className="nav-link text-white" to="/admin-requests">
              👥 Registration Requests
            </Link>

            <Link className="nav-link text-white" to="/admin-residents">
              🏠 Residents
            </Link>

            <Link className="nav-link text-white" to="/admin-complaints">
              📝 Complaints
            </Link>

            <Link className="nav-link text-white" to="/admin-payments">
              💳 Payments
            </Link>

            <Link className="nav-link text-white" to="/admin-notices">
              📢 Notices
            </Link>
          </li>

          {/* Logout Button */}
          <li className="nav-item mt-5">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                localStorage.removeItem("admin");
                localStorage.removeItem("token");
                window.location.href = "/admin-login";
              }}
            >
              🚪 Logout
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;