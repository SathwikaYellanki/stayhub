import { useEffect, useState } from "react";
import API from "../../services/api";
import ResidentSidebar from "../../components/resident/ResidentSidebar";
import ResidentTopbar from "../../components/resident/ResidentTopbar";

function PaymentStatus() {

  const resident = JSON.parse(localStorage.getItem("resident"));

  const [payments, setPayments] = useState([]);

  const [formData, setFormData] = useState({
    month: new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    }),
    amount: 2500,
    paid: false,
  });

  const fetchPayments = async () => {
    try {
      const res = await API.get(
        `/payments/resident/${resident.id}`
      );

      setPayments(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/payments", {
        resident: resident.id,
        month: formData.month,
        amount: formData.amount,
        paid: formData.paid,
      });

      alert("Payment Submitted Successfully");

      setFormData({
        month: new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        amount: 2500,
        paid: false,
      });

      fetchPayments();

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

          <h2>Maintenance Payment</h2>

          <form
            className="card p-4 mb-4"
            onSubmit={handleSubmit}
          >

            <div className="mb-3">

              <label>Month</label>

              <input
                className="form-control"
                value={formData.month}
                readOnly
              />

            </div>

            <div className="mb-3">

              <label>Amount</label>

              <input
                className="form-control"
                value={formData.amount}
                readOnly
              />

            </div>

            <div className="form-check mb-4">

              <input
                type="checkbox"
                className="form-check-input"
                id="paid"
                checked={formData.paid}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paid: e.target.checked,
                  })
                }
              />

              <label
                htmlFor="paid"
                className="form-check-label"
              >
                I have paid the maintenance fee.
              </label>

            </div>

            <button
              className="btn btn-success"
              disabled={!formData.paid}
            >
              Submit Payment
            </button>

          </form>

          <h3>Payment History</h3>

          <table className="table table-bordered mt-3">

            <thead className="table-dark">

              <tr>

                <th>Month</th>

                <th>Amount</th>

                <th>Status</th>

                <th>Reminder</th>

              </tr>

            </thead>

            <tbody>

              {payments.length === 0 ? (

                <tr>

                  <td colSpan="4" className="text-center">
                    No Payments Found
                  </td>

                </tr>

              ) : (

                payments.map((payment) => (

                  <tr key={payment._id}>

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

                      {payment.reminder ? (
                        <span className="text-danger fw-bold">
                          🔔 Payment Reminder
                        </span>
                      ) : (
                        "-"
                      )}

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

export default PaymentStatus;