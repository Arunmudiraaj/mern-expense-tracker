const Razorpay = require("razorpay");
const Order = require("../models/order");
module.exports.purchasePremium = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 10000;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderId: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

module.exports.updateOrderStatus = async (req, res) => {
  //   console.log("User is", req.user);
  //   console.log(req.body);
  try {
    const order = await Order.findOne({
      where: { orderId: req.body.order_id },
    });
    const promise1 = req.user.update({ isPremiumUser: true });
    const promise2 = order.update({ status: "SUCCESSFUL" });
    Promise.all([promise1, promise2])
      .then((result) => {
        res.json({ message: "You are now a premium user" });
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (err) {
    res.status(403).json({ error: err, message: "Transaction Failed" });
  }
};

module.exports.updateOrderStatusFailed = (req, res) => {
  //   console.log("User is", req.user);
  //   console.log(req.body);
  Order.findOne({ where: { orderId: req.body.order_id } })

    .then((ord) => {
      return ord.update({ status: "FAILED" });
    })
    .then((r) => {
      res.json({ message: "Transaction Failed" });
    })
    .catch((err) => {
      console.log(err);
    });
};
