const Complaint = require("../models/Complaint");

// Resident raises complaint
const addComplaint = async (req, res) => {
  try {

    const { resident, title, description } = req.body;

    const complaint = new Complaint({
      resident,
      title,
      description,
    });

    await complaint.save();

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Admin views all complaints
const getComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("resident", "name flatNo")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
// Resident - Get My Complaints
const getMyComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find({
      resident: req.params.residentId,
    }).sort({
      createdAt: -1,
    });

    res.json(complaints);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
// Admin updates complaint status
const updateComplaintStatus = async (req, res) => {
  try {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    res.json({
      success: true,
      message: "Complaint status updated successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  getMyComplaints,
};