const mongoose = require("mongoose");

const paymentScema = new mongoose.Schema({
  amount: Number,
  currency: String,
  id: String,
  booking_id: String,
  payment_status: String,
});

module.exports = mongoose.model("payment", paymentScema);
