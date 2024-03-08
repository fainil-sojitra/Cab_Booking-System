const mongoose = require("mongoose");

const cabBookingFormScema = new mongoose.Schema({
  full_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    // unique: ["true", "Email id alredy present"],
  },
  contact: {
    type: Number,
    min: 10,
    require: true,
    // unique: ["true", "Number id alredy present"],
  },
  from_date: {
    type: String,
    require: true,
  },
  to_date: {
    type: String,
    require: true,
  },
  rent_days: {
    type: Number,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  cab_name: {
    type: String,
    require: true,
  },
  cab_rent: {
    type: Number,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  amount: Number,
  currency: String,
  id: String,
});

module.exports = mongoose.model("cab_booking_forms", cabBookingFormScema);
