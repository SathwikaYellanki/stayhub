import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CreatePassword from "../pages/auth/CreatePassword";

// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRequests from "../pages/admin/AdminRequests";

// Resident
import ResidentDashboard from "../pages/resident/ResidentDashboard";
import Complaint from "../pages/resident/Complaint";
import NoticeBoard from "../pages/resident/NoticeBoard";
import PaymentStatus from "../pages/resident/PaymentStatus";
import Profile from "../pages/resident/Profile";

function AppRoutes() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-password" element={<CreatePassword />} />

      {/* Admin */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-requests" element={<AdminRequests />} />

      {/* Resident */}
      <Route path="/resident-dashboard" element={<ResidentDashboard />} />
      <Route path="/resident-complaints" element={<Complaint />} />
      <Route path="/resident-notices" element={<NoticeBoard />} />
      <Route path="/resident-payments" element={<PaymentStatus />} />
      <Route path="/resident-profile" element={<Profile />} />

    </Routes>
  );
}

export default AppRoutes;