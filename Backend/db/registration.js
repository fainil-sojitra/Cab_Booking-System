const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  type: String,
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: ["true", "Email id alredy present"],
  },
  contact: {
    type: Number,
    min: 10,
    require: true,
    unique: ["true", "Number id alredy present"],
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
  },
});

module.exports = mongoose.model("registrations", registrationSchema);
