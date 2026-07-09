import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import DashboardCard from "../../components/common/DashboardCard";
import API from "../../services/api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalResidents: 0,
    pendingRequests: 0,
    complaints: 0,
    payments: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="flex-grow-1">
        <AdminTopbar />

        <div className="container mt-4">

          <div className="row g-4">

            <div className="col-md-3">
              <DashboardCard
                title="Total Residents"
                value={stats.totalResidents}
                color="primary"
              />
            </div>

            <div className="col-md-3">
              <DashboardCard
                title="Pending Requests"
                value={stats.pendingRequests}
                color="warning"
              />
            </div>

            <div className="col-md-3">
              <DashboardCard
                title="Complaints"
                value={stats.complaints}
                color="danger"
              />
            </div>

            <div className="col-md-3">
              <DashboardCard
                title="Payments"
                value={stats.payments}
                color="success"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;