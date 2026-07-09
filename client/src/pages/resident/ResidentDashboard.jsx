import ResidentWelcome from "../../components/resident/ResidentWelcome";
import ResidentStats from "../../components/resident/ResidentStats";
import RecentNotices from "../../components/resident/RecentNotices";
import RecentComplaints from "../../components/resident/RecentComplaints";
import ResidentSidebar from "../../components/resident/ResidentSidebar";
import ResidentTopbar from "../../components/resident/ResidentTopbar";
function ResidentDashboard() {
  return (
    <div className="d-flex">

      <ResidentSidebar />

      <div className="flex-grow-1">

        <ResidentTopbar />

        <div className="container mt-4">

          <ResidentWelcome />

          <ResidentStats />

          <RecentNotices />

          <RecentComplaints />

        </div>

      </div>

    </div>
  );
}

export default ResidentDashboard;