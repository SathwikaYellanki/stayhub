import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        backgroundColor: "#198754",
      }}
 
    >
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom"></nav>
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4" to="/">
          🏢 StayHub
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link text-white" to="/">
            Home
          </Link>

          <Link className="nav-link text-white" to="/login">
            Resident Login
          </Link>

          <Link className="nav-link text-white" to="/register">
            Register
          </Link>

          <Link className="nav-link text-white" to="/admin-login">
            Admin
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;