import { useEffect, useState } from "react";
import API from "../../services/api";
import ResidentSidebar from "../../components/resident/ResidentSidebar";
import ResidentTopbar from "../../components/resident/ResidentTopbar";

function Notifications() {

  const resident = JSON.parse(localStorage.getItem("resident"));

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const noticeRes = await API.get("/notices");

      const complaintRes = await API.get(
        `/complaints/resident/${resident.id}`
      );

      const paymentRes = await API.get(
        `/payments/resident/${resident.id}`
      );
      const residentRes = await API.get(
        `/auth/resident/${resident.id}`
      );

      let list = [];

      // Notices
      noticeRes.data.forEach((notice) => {
        list.push({
          type: "notice",
          message: `📢 ${notice.title}`,
          date: notice.createdAt,
        });
      });

      // Complaints
      complaintRes.data.forEach((complaint) => {
        list.push({
          type: "complaint",
          message: `🛠 Complaint "${complaint.title}" is ${complaint.status}`,
          date: complaint.updatedAt,
        });
      });

      // Payments
      paymentRes.data.forEach((payment) => {

        if (payment.status === "Verified") {

          list.push({
            type: "payment",
            message: `💰 Your ${payment.month} payment has been verified.`,
            date: payment.updatedAt,
          });

        }

        if (payment.reminder) {

          list.push({
            type: "reminder",
            message: `🔔 Please pay your ${payment.month} maintenance.`,
            date: payment.updatedAt,
          });

        }

      });
      // Payment Reminder from User collection
if (residentRes.data.paymentReminder) {

  list.unshift({
    type: "paymentReminder",
    message: "🔔 Please pay your maintenance amount.",
    date: new Date(),
  });

}
      list.sort((a, b) => new Date(b.date) - new Date(a.date));

      setNotifications(list);

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

          <h2>🔔 Notifications</h2>

          {notifications.length === 0 ? (

            <div className="alert alert-info mt-4">

              No notifications available.

            </div>

          ) : (

            notifications.map((item, index) => (

              <div
                key={index}
                className="card shadow-sm mb-3"
              >

                <div className="card-body">

                  <h5>{item.message}</h5>

                  <small className="text-muted">

                    {new Date(item.date).toLocaleString()}

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

export default Notifications;