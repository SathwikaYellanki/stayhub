const express = require("express");

const router = express.Router();

const {
  registerRequest,
  getPendingRequests,
  approveResident,
  rejectResident,
  createAdmin,
  adminLogin,
  createPassword,
  checkStatus,
  residentLogin,
  getResidentProfile,
  changePassword,
} = require("../controllers/authController");

// Resident Registration
router.post("/register", registerRequest);

// Admin
router.get("/pending", getPendingRequests);

router.put("/approve/:id", approveResident);

router.put("/reject/:id", rejectResident);

router.post("/create-admin", createAdmin);

router.post("/admin-login", adminLogin);
router.post("/create-password", createPassword);
router.post("/check-status", checkStatus);
router.post("/login", residentLogin);
router.get("/profile/:id", getResidentProfile);

router.put("/change-password", changePassword);

module.exports = router;