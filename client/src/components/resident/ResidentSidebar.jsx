import { Link } from "react-router-dom";

function ResidentSidebar() {
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

          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white"
              to="/resident-dashboard"
            >
              🏠 Dashboard
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white"
              to="/resident-complaints"
            >
              🛠 Complaints
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white"
              to="/resident-notices"
            >
              📢 Notices
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white"
              to="/resident-payments"
            >
              💰 Rent Payment
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white"
              to="/resident-profile"
            >
              👤 Profile
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link
              className="nav-link text-white"
              to="/resident-notifications"
            >
              🔔 Notifications
            </Link>
          </li>

          <li className="nav-item mt-5">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                localStorage.removeItem("resident");
                localStorage.removeItem("token");
                window.location.href = "/login";
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

export default ResidentSidebar;