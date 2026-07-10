import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";

function Payments() {

  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments");
      setPayments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const verifyPayment = async (id) => {
    try {
      await API.put(`/payments/verify/${id}`);

      alert("Payment Verified");

      fetchPayments();

    } catch (error) {
      console.log(error);
    }
  };

  const sendReminder = async (id) => {
    try {

      await API.put(`/payments/reminder/${id}`);

      alert("Reminder Sent");

      fetchPayments();

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

          <h2>Payment Management</h2>

          <table className="table table-bordered mt-4">

            <thead className="table-dark">

              <tr>

                <th>Name</th>

                <th>Flat</th>

                <th>Month</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Verify</th>

                <th>Reminder</th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr key={payment._id}>

                  <td>{payment.resident?.name}</td>

                  <td>{payment.resident?.flatNo}</td>

                  <td>{payment.month}</td>

                  <td>₹ {payment.amount}</td>

                  <td>

                    <span
                      className={`badge ${
                        payment.status === "Verified"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {payment.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn btn-success btn-sm"
                      disabled={payment.status === "Verified"}
                      onClick={() =>
                        verifyPayment(payment._id)
                      }
                    >
                      Verify
                    </button>

                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        sendReminder(payment._id)
                      }
                    >
                      Reminder
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

export default Payments;