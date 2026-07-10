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
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("resident", "name flatNo")
      .sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {
    console.error(error);

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
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    payment.reminder = true;

    await payment.save();

    res.json({
      success: true,
      message: "Reminder sent successfully.",
    });

  } catch (error) {
    console.error(error);

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