const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalResidents = await User.countDocuments({
      role: "resident",
      status: "Approved",
    });

    const pendingRequests = await User.countDocuments({
      status: "Pending",
    });

    res.json({
      totalResidents,
      pendingRequests,
      complaints: 0,
      payments: 0,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};