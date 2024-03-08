const mongoose = require("mongoose");

const cabDetailSchema = new mongoose.Schema({
  cab_name: String,
  cab_model: String,
  cab_seat: String,
  cab_charge: Number,
  cab_image: String,
  cab_brand: String,
  cab_rating: Number,
  cab_speed: String,
  cab_gps: String,
  cab_transmissions: String,
  cab_description: String,
  cab_status: String,
});

module.exports = mongoose.model("cabdetails", cabDetailSchema);

// const cabImageSchema = new mongoose.Schema({
//   cab_image: String,
// });

// module.exports = mongoose.model("cabdetails", cabImageSchema);
