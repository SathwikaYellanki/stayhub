import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
    style={{
  backgroundColor: "#198754",
  color: "white",
  width: "250px",
  minHeight: "100vh",
}}
    >
      <div className="sidebar-custom text-white"></div>
      <h3 className="text-center mb-4">
        🏢 StayHub
      </h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <NavLink
            to="/admin-dashboard"
            className="nav-link text-white"
          >
            📊 Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin-requests"
            className="nav-link text-white"
          >
            👥 Registration Requests
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin/residents"
            className="nav-link text-white"
          >
            🏠 Residents
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin/complaints"
            className="nav-link text-white"
          >
            📝 Complaints
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin/payments"
            className="nav-link text-white"
          >
            💳 Payments
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/admin/notices"
            className="nav-link text-white"
          >
            📢 Notices
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;