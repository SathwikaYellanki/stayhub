function ResidentWelcome() {
  const resident = JSON.parse(localStorage.getItem("resident"));

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <h2>
          Welcome, {resident?.name} 👋
        </h2>

        <p className="mb-1">
          <strong>Flat Number:</strong> {resident?.flatNo}
        </p>

        <p className="mb-0">
          <strong>Email:</strong> {resident?.email}
        </p>

      </div>
    </div>
  );
}

export default ResidentWelcome;