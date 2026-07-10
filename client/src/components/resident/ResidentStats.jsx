import { useEffect, useState } from "react";
import API from "../../services/api";

function ResidentStats() {

  const resident = JSON.parse(localStorage.getItem("resident"));

  const [stats, setStats] = useState({
    complaints: 0,
    notices: 0,
    paymentStatus: "Not Paid",
    notifications: 0,
  });

  const fetchStats = async () => {
    try {

      const res = await API.get(
        `/admin/resident-dashboard/${resident.id}`
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (

    <div className="row mt-4">

      <div className="col-md-3 mb-3">

        <div className="card text-center shadow">

          <div className="card-body">

            <h1>🛠</h1>

            <h3>{stats.complaints}</h3>

            <p>Total Complaints</p>

          </div>

        </div>

      </div>

      <div className="col-md-3 mb-3">

        <div className="card text-center shadow">

          <div className="card-body">

            <h1>📢</h1>

            <h3>{stats.notices}</h3>

            <p>Total Notices</p>

          </div>

        </div>

      </div>

      <div className="col-md-3 mb-3">

        <div className="card text-center shadow">

          <div className="card-body">

            <h1>💰</h1>

            <h3>{stats.paymentStatus}</h3>

            <p>Payment Status</p>

          </div>

        </div>

      </div>

      <div className="col-md-3 mb-3">

        <div className="card text-center shadow">

          <div className="card-body">

            <h1>🔔</h1>

            <h3>{stats.notifications}</h3>

            <p>Notifications</p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ResidentStats;