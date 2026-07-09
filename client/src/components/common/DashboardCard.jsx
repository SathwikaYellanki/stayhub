function DashboardCard({ title, value, color }) {
  return (
    <div className={`card border-0 shadow-sm bg-${color} text-white`}>
      <div className="card-body text-center">

        <h6>{title}</h6>

        <h2>{value}</h2>

      </div>
    </div>
  );
}

export default DashboardCard;