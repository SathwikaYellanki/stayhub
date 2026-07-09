import DashboardCard from "../common/DashboardCard";

function ResidentStats() {
  return (
    <div className="row g-4">

      <div className="col-md-3">
        <DashboardCard
          title="Complaints"
          value="0"
          color="danger"
        />
      </div>

      <div className="col-md-3">
        <DashboardCard
          title="Rent Status"
          value="Verified"
          color="success"
        />
      </div>

      <div className="col-md-3">
        <DashboardCard
          title="Notices"
          value="0"
          color="warning"
        />
      </div>

      <div className="col-md-3">
        <DashboardCard
          title="Profile"
          value="View"
          color="primary"
        />
      </div>

    </div>
  );
}

export default ResidentStats;