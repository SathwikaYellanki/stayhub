const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Notice = require("../models/Notice");
const Payment = require("../models/Payment");
const getDashboardStats = async (req, res) => {
  try {

    const totalResidents = await User.countDocuments({
      role: "resident",
      status: "Approved",
    });

    const pendingRequests = await User.countDocuments({
      status: "Pending",
    });

    const complaints = await Complaint.countDocuments();

    const payments = await Payment.countDocuments();

    res.json({
      totalResidents,
      pendingRequests,
      complaints,
      payments,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Resident Dashboard
const getResidentDashboard = async (req, res) => {
  try {

    const residentId = req.params.id;

    const complaints = await Complaint.countDocuments({
      resident: residentId,
    });

    const notices = await Notice.countDocuments();

    const payment = await Payment.findOne({
      resident: residentId,
    }).sort({
      createdAt: -1,
    });

    const notifications =
      notices +
      complaints +
      (payment ? 1 : 0);

    res.json({
      complaints,
      notices,
      paymentStatus: payment
        ? payment.status
        : "Not Paid",
      notifications,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
// Get Approved Residents
const getResidents = async (req, res) => {
  try {
    const residents = await User.find({
      role: "resident",
      status: "Approved",
    }).select("-password");

    res.status(200).json(residents);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  getDashboardStats,
  getResidents,
  getResidentDashboard,
};