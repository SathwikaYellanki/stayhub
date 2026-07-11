const Payment = require("../models/Payment");

// Resident submits payment
const addPayment = async (req, res) => {
  try {
    const { resident, month, amount, paid } = req.body;

    const payment = new Payment({
      resident,
      month,
      amount,
      paid,
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: "Payment submitted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Admin - Get all payments
const User = require("../models/User");

const getPayments = async (req, res) => {
  try {

    const residents = await User.find({
      role: "resident",
      status: "Approved",
    }).select("name flatNo");

    const payments = await Payment.find()
      .populate("resident", "name flatNo")
      .sort({ createdAt: -1 });

    const result = residents.map((resident) => {

      const payment = payments.find(
        (p) =>
          p.resident &&
          p.resident._id.toString() === resident._id.toString()
      );

      if (payment) {

        return {
          _id: payment._id,
          residentId: resident._id,
          name: resident.name,
          flatNo: resident.flatNo,
          month: payment.month,
          amount: payment.amount,
          status: payment.status,
          reminder: payment.reminder,
        };

      }

      return {
        residentId: resident._id,
        name: resident.name,
        flatNo: resident.flatNo,
        month: "-",
        amount: 2500,
        status: "Not Paid",
        reminder: false,
      };

    });

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Admin - Verify payment
const verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    payment.status = "Verified";

    await payment.save();

    res.json({
      success: true,
      message: "Payment verified successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Admin - Send reminder


const sendReminder = async (req, res) => {
  try {

    const resident = await User.findById(req.params.id);

    if (!resident) {
      return res.status(404).json({
        message: "Resident not found",
      });
    }

    resident.paymentReminder = true;

    await resident.save();

    res.json({
      success: true,
      message: "Reminder sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
// Resident - Get my payments
const getResidentPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      resident: req.params.residentId,
    }).sort({
      createdAt: -1,
    });

    res.json(payments);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addPayment,
  getPayments,
  verifyPayment,
  sendReminder,
  getResidentPayments,
};