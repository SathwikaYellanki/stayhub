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
import Notices from "../pages/admin/Notices";
import Complaints from "../pages/admin/Complaints";
import Payments from "../pages/admin/Payments";

// Resident
import ResidentDashboard from "../pages/resident/ResidentDashboard";
import Complaint from "../pages/resident/Complaint";
import NoticeBoard from "../pages/resident/NoticeBoard";
import PaymentStatus from "../pages/resident/PaymentStatus";
import Profile from "../pages/resident/Profile";
import Residents from "../pages/admin/Residents";
import Notifications from "../pages/resident/Notifications";
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
      <Route path="/admin/residents" element={<Residents />} />
      <Route path="/admin/notices" element={<Notices />} />
      <Route path="/admin/complaints" element={<Complaints />} />
      <Route path="/admin/payments" element={<Payments />} />
      

      {/* Resident */}
      <Route path="/resident-dashboard" element={<ResidentDashboard />} />
      <Route path="/resident-complaints" element={<Complaint />} />
      <Route path="/resident-notices" element={<NoticeBoard />} />
      <Route path="/resident-payments" element={<PaymentStatus />} />
      <Route path="/resident-profile" element={<Profile />} />
      <Route path="/resident-notifications" element={<Notifications />} />
      
    </Routes>
  );
}

export default AppRoutes;