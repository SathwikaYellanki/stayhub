const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getResidents,
  getResidentDashboard,
} = require("../controllers/adminController");

router.get("/dashboard", getDashboardStats);
router.get("/residents", getResidents);
router.get("/resident-dashboard/:id",getResidentDashboard);
module.exports = router;