function RecentComplaints() {
  const complaints = [
    {
      title: "Water Leakage",
      status: "Pending",
    },
    {
      title: "Electric Issue",
      status: "Resolved",
    },
  ];

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-danger text-white">
        <h5 className="mb-0">🛠 Recent Complaints</h5>
      </div>

      <div className="card-body">

        <table className="table">

          <thead>
            <tr>
              <th>Complaint</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {complaints.map((item, index) => (

              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.status}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default RecentComplaints;