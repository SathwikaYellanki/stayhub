import { useEffect, useState } from "react";
import API from "../../services/api";
import ResidentSidebar from "../../components/resident/ResidentSidebar";
import ResidentTopbar from "../../components/resident/ResidentTopbar";

function NoticeBoard() {

  const [notices, setNotices] = useState([]);

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

  return (
    <div className="d-flex">

      <ResidentSidebar />

      <div className="flex-grow-1">

        <ResidentTopbar />

        <div className="container mt-4">

          <h2>Apartment Notices</h2>

          {notices.length === 0 ? (

            <div className="alert alert-info mt-4">
              No notices available.
            </div>

          ) : (

            notices.map((notice) => (

              <div
                className="card shadow-sm mb-4"
                key={notice._id}
              >

                <div className="card-header bg-warning">

                  <h5 className="mb-0">
                    📢 {notice.title}
                  </h5>

                </div>

                <div className="card-body">

                  <p>{notice.description}</p>

                  <small className="text-muted">

                    Posted on{" "}
                    {new Date(
                      notice.createdAt
                    ).toLocaleDateString()}

                  </small>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default NoticeBoard;