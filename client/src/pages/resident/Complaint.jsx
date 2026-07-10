import { useEffect, useState } from "react";
import API from "../../services/api";
import ResidentSidebar from "../../components/resident/ResidentSidebar";
import ResidentTopbar from "../../components/resident/ResidentTopbar";

function Complaint() {

  const resident = JSON.parse(localStorage.getItem("resident"));

  const [complaints, setComplaints] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchComplaints = async () => {
    try {

      const res = await API.get(
        `/complaints/resident/${resident.id}`
      );

      setComplaints(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/complaints", {
        resident: resident.id,
        title: formData.title,
        description: formData.description,
      });

      alert("Complaint Submitted Successfully");

      setFormData({
        title: "",
        description: "",
      });

      fetchComplaints();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">

      <ResidentSidebar />

      <div className="flex-grow-1">

        <ResidentTopbar />

        <div className="container mt-4">

          <h2>Complaint Management</h2>

          <form
            className="card p-4 mb-4"
            onSubmit={handleSubmit}
          >

            <div className="mb-3">

              <label>Complaint Title</label>

              <input
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Description</label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

            <button className="btn btn-primary">
              Submit Complaint
            </button>

          </form>

          <h3>My Complaints</h3>

          <table className="table table-bordered mt-3">

            <thead className="table-dark">

              <tr>

                <th>Title</th>

                <th>Description</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {complaints.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center"
                  >
                    No Complaints Found
                  </td>

                </tr>

              ) : (

                complaints.map((complaint) => (

                  <tr key={complaint._id}>

                    <td>{complaint.title}</td>

                    <td>{complaint.description}</td>

                    <td>

                      <span
                        className={`badge ${
                          complaint.status === "Resolved"
                            ? "bg-success"
                            : complaint.status === "In Progress"
                            ? "bg-primary"
                            : "bg-warning"
                        }`}
                      >
                        {complaint.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Complaint;