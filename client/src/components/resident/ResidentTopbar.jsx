function ResidentTopbar() {

  const resident =
    JSON.parse(localStorage.getItem("resident"));

  return (
    <div className="bg-white shadow-sm p-3 d-flex justify-content-between">

      <h4>
        Resident Dashboard
      </h4>

      <h5>
        Welcome,
        {" "}
        {resident?.name}
        👋
      </h5>

    </div>
  );
}

export default ResidentTopbar;