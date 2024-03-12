require("dotenv").config();
const express = require("express");
// import { instance } from "../Backend.js";
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const path = require("path");
require("./db/config");
const Registration = require("./db/registration");
const CabDetail = require("./db/cabDetails");
const BookingForm = require("./db/cabBookingForm");
const Contact = require("./db/contact");
const PaymentController = require("./db/payment");
const PaymentModel = require("./db/paymentModel");

// const cabImageSchema = require("./db/cabDetails");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/cab-images", express.static("cab-images"));
// ================= Login Registration api start =================

// --------- post registration api ---------

app.post("/registration", async (req, res) => {
  let registration = new Registration(req.body);
  let result = await registration.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

// ----------- post login api -----------

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let registration = await Registration.findOne(req.body).select("-password");
    if (registration) {
      res.send(registration);
    } else {
      res.send({ result: "no user registration" });
    }
  } else {
    res.send({ result: "no user registration" });
  }
});

// ----------- get registration data api -----------

app.get("/registration", async (req, res) => {
  let registration = await Registration.find(req.body);
  res.send(registration);
});

// ----------- delete registration single data api -----------

app.delete("/delete/:id", async (req, res) => {
  let registration = await Registration.deleteOne({ _id: req.params.id });
  res.send(registration);
});

// ----------- booking count get api -----------

app.get("/total_registration", async (req, res) => {
  let clients = await Registration.countDocuments({
    type: { $in: ["client"] },
  });
  let drivers = await Registration.countDocuments({
    type: { $in: ["driver"] },
  });
  // let registration = await Registration.estimatedDocumentCount();
  // console.log(clients, drivers);
  res.status(200).send({ clients, drivers });
});

// ================= Login registration api end =================

// ================= Cab Details api start =================

// --------- cab details post api ---------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./cab-images/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/cabDetails", upload.single("cab_image"), async (req, res) => {
  let cabDetails = new CabDetail({ ...req.body, cab_image: req.file.path });
  console.log("req.file-->", req.file);
  console.log("cabDetails-->", cabDetails);
  let result = await cabDetails.save();
  result = result.toObject();
  res.send(result);
});

// --------- cab details get api ---------

app.get("/cabDetails", async (req, res) => {
  let cabDetails = await CabDetail.find(req.body);
  res.send(cabDetails);
});

// --------- cab details get api ---------

app.get("/cabDetails/:id", async (req, res) => {
  let cabDetails = await CabDetail.findOne({ _id: req.params.id });
  res.send(cabDetails);
});

// --------- cab details put api ---------

app.put("/cabDetails/:_id", async (req, res) => {
  let cabDetails = await CabDetail.updateOne(
    { _id: req.params._id },
    req.body,
    { new: true }
  );
  res.send(cabDetails);
});

// ----------- cab details delete api -----------

app.delete("/cabDetails/:id", async (req, res) => {
  let cabDetails = await CabDetail.deleteOne({ _id: req.params.id });
  res.send(cabDetails);
});

// ----------- cab details count get api -----------

app.get("/total_cabs", async (req, res) => {
  let cabDetails = await CabDetail.estimatedDocumentCount();
  // console.log(cabDetails);
  res.status(200).send({ total_cabs: cabDetails });
});

// ================= Cab Details api end =================

// ================= Cab Booking Form api start =================

// ----------- booking form post api -----------

app.post("/booking", async (req, res) => {
  let bookingForm = new BookingForm(req.body);
  let result = await bookingForm.save();
  result = result.toObject();
  res.send(result);
});

// ----------- booking form get api -----------

app.get("/booking", async (req, res) => {
  let bookingForm = await BookingForm.find(req.body);
  res.send(bookingForm);
});

// ----------- booking form get api -----------

app.get("/booking/:id", async (req, res) => {
  let bookingForm = await BookingForm.findOne({ _id: req.params.id });
  res.send(bookingForm);
});

// ----------- booking form put api -----------

app.put("/booking/:_id", async (req, res) => {
  let bookingForm = await BookingForm.updateOne(
    { _id: req.params._id },
    req.body,
    { new: true }
  );
  res.send(bookingForm);
});

// ----------- booking count get api -----------

app.get("/total_booking", async (req, res) => {
  let bookingForm = await BookingForm.estimatedDocumentCount();
  // console.log(bookingForm);
  res.status(200).send({ total_booking: bookingForm });
});

// ================= Cab Booking Form api end =================

// ================= Contact Form api start =================

// ----------- contact form post api -----------

app.post("/contact", async (req, res) => {
  let contact = new Contact(req.body);
  let result = await contact.save();
  result = result.toObject();
  res.send(result);
  // console.log(result.email);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Cab Booking"<process.env.EMAIL>',
      to: result.email,
      subject: "Cab Booking System",
      html: "<h1><u>Our Contact Information</u></h1> <br/> <h3> Cab Booking System : <br/> Address : 123 Royal Bazar, Katargam, Surat, Gujrat,<br/> Mo.Number : 8320656249,<br/> Email : cabbooking9@gmail.com,<br/><br/> how can i help you. </h3>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    res.status(201).json({ status: 401, error });
  }
});

// ----------- contact form count get api -----------

app.get("/contact", async (req, res) => {
  let contact = await Contact.find();
  res.send(contact);
});

// ----------- contact form delete api -----------

app.delete("/contact/:id", async (req, res) => {
  let contact = await Contact.deleteOne({ _id: req.params.id });
  res.send(contact);
});

// ================= Contact Form api start =================

// ================= Payment api start =================

// ----------- payment intigration api -----------

// var instance = new Razorpay({
//   key_id: "process.env.RAZORPAY_API_KEY",
//   key_secret: "process.env.RAZORPAY_API_SECRET",
// });

app.post("/orders", PaymentController.orders);
app.post("/verify", PaymentController.verify);

// ----------- payment data put api -----------

app.put("/payment/:booking_id", async (req, res) => {
  let payment = await PaymentModel.updateOne(
    { booking_id: req.params.booking_id },
    { payment_status: "Success" },
    { new: true }
  );
  res.send(payment);
});

// ----------- payment data get api -----------

app.get("/payment", async (req, res) => {
  let payment = await PaymentModel.find(req.body);
  res.send(payment);
});

// ================= Payment api end =================

app.listen(5000);
