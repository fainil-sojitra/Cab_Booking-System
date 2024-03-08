const Razorpay = require("razorpay");
const crypto = require("crypto");
const PaymentModel = require("./paymentModel");

module.exports.orders = (req, res) => {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  // console.log(req.body);
  var options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  console.log(options, "15");
  instance.orders.create(options, async function (error, order) {
    console.log("Error:", error);
    if (error) {
      return res.send({ code: 500, messag: "Server Error" });
    }
    const payment = new PaymentModel({ ...req.body, ...order });
    let result = await payment.save();
    // console.log(result, "--> 23");
    result = result.toObject();
    return res.send({ data: result });
  });
};

module.exports.verify = (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;
  console.log(body);
  let expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.response.razorpay_signature) {
    res.send({ code: 200, message: "signature is Valid" });
  } else {
    res.send({ code: 500, message: "signature is InValid" });
  }
};
