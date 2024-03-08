const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  type: String,
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("contact", contactSchema);

// const cabImageSchema = new mongoose.Schema({
//   cab_image: String,
// });

// module.exports = mongoose.model("cabdetails", cabImageSchema);
