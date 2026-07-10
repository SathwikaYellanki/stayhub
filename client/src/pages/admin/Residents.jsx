import { useEffect, useState } from "react";
import API from "../../services/api";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

function Residents() {
  const [residents, setResidents] = useState([]);

  const fetchResidents = async () => {
    try {
      const res = await API.get("/admin/residents");
      setResidents(res.data);
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  return (
    <div className="d-flex">

      <AdminSidebar />

      <div className="flex-grow-1">

        <AdminTopbar />

        <div className="container mt-4">

          <h2 className="mb-4">Approved Residents</h2>

          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Flat No</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>

              {residents.length > 0 ? (
                residents.map((resident) => (
                  <tr key={resident._id}>
                    <td>{resident.name}</td>
                    <td>{resident.flatNo}</td>
                    <td>{resident.email}</td>
                    <td>{resident.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No approved residents found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Residents;