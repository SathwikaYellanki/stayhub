import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

function Complaints() {

  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}`, { status });

      fetchComplaints();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">

      <AdminSidebar />

      <div className="flex-grow-1">

        <AdminTopbar />

        <div className="container mt-4">

          <h2>Complaint Management</h2>

          <table className="table table-bordered mt-4">

            <thead className="table-dark">

              <tr>

                <th>Resident</th>

                <th>Flat No</th>

                <th>Complaint</th>

                <th>Description</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {complaints.map((complaint) => (

                <tr key={complaint._id}>

                  <td>{complaint.resident?.name}</td>

                  <td>{complaint.resident?.flatNo}</td>

                  <td>{complaint.title}</td>

                  <td>{complaint.description}</td>

                  <td>

                    <select
                      className="form-select"
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(
                          complaint._id,
                          e.target.value
                        )
                      }
                    >

                      <option>Pending</option>

                      <option>In Progress</option>

                      <option>Resolved</option>

                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Complaints;