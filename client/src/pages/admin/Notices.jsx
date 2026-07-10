import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

function Notices() {

  const [notices, setNotices] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchNotices = async () => {
    try {
      const res = await API.get("/notices");
      setNotices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await API.put(
          `/notices/${editingId}`,
          formData
        );

        setMessage("Notice Updated Successfully");

      } else {

        await API.post(
          "/notices",
          formData
        );

        setMessage("Notice Added Successfully");
      }

      resetForm();

      fetchNotices();

    } catch (error) {

      console.log(error);

    }
  };

  const handleEdit = (notice) => {

    setEditingId(notice._id);

    setFormData({
      title: notice.title,
      description: notice.description,
    });
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this notice?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/notices/${id}`);

      setMessage("Notice Deleted Successfully");

      fetchNotices();

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

          <h2>Notice Management</h2>

          {message && (
            <div className="alert alert-success">
              {message}
            </div>
          )}

          <form
            className="card p-4 mt-3 mb-4"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Notice Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Notice Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <button
              className={`btn ${
                editingId
                  ? "btn-warning"
                  : "btn-primary"
              }`}
            >
              {editingId
                ? "Update Notice"
                : "Add Notice"}
            </button>

          </form>

          <table className="table table-bordered">

            <thead className="table-dark">

              <tr>

                <th>Title</th>

                <th>Description</th>

                <th width="180">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {notices.map((notice) => (

                <tr key={notice._id}>

                  <td>{notice.title}</td>

                  <td>{notice.description}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(notice)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(notice._id)
                      }
                    >
                      Delete
                    </button>

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

export default Notices;