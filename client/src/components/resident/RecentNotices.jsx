function RecentNotices() {
  const notices = [
    "Water Tank Cleaning - Sunday 10:00 AM",
    "Lift Maintenance - Monday",
    "Parking Rules Updated",
  ];

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">📢 Recent Notices</h5>
      </div>

      <div className="card-body">
        <ul className="list-group list-group-flush">
          {notices.map((notice, index) => (
            <li key={index} className="list-group-item">
              {notice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentNotices;