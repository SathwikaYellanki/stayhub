const express = require("express");

const router = express.Router();

const {
  addPayment,
  getPayments,
  verifyPayment,
  sendReminder,
  getResidentPayments,
} = require("../controllers/paymentController");

router.post("/", addPayment);

router.get("/", getPayments);

router.put("/verify/:id", verifyPayment);

router.put("/reminder/:id", sendReminder);

router.get("/resident/:residentId", getResidentPayments);

module.exports = router;