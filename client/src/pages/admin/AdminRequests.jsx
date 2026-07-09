import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/auth/pending");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    await API.put(`/auth/approve/${id}`);
    fetchRequests();
  };

  const reject = async (id) => {
    await API.put(`/auth/reject/${id}`);
    fetchRequests();
  };

  return (
    <div className="container mt-4">
      <h2>Registration Requests</h2>

      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Flat</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No Pending Requests
              </td>
            </tr>
          ) : (
            requests.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.flatNo}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => approve(user._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => reject(user._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminRequests;