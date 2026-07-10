const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      default: 2500,
    },

    paid: {
        type: Boolean,
        default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Verified"],
      default: "Pending",
    },

    reminder: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);