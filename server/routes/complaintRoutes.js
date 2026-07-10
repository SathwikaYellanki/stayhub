const express = require("express");

const router = express.Router();

const {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  getMyComplaints,
} = require("../controllers/complaintController");

router.post("/", addComplaint);

router.get("/", getComplaints);

router.get("/resident/:residentId", getMyComplaints);
router.put("/:id", updateComplaintStatus);
module.exports = router;