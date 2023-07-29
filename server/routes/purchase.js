const express = require("express");
const routes = express.Router();
const purchaseControllers = require("../controllers/purchase");
const authMiddleware = require("../middleware/auth");
routes.get(
  "/getpremium",
  authMiddleware.authenticate,
  purchaseControllers.purchasePremium
);
routes.post(
  "/updateorderstatus",
  authMiddleware.authenticate,
  purchaseControllers.updateOrderStatus
);
routes.post(
  "/paymentfailed",
  authMiddleware.authenticate,
  purchaseControllers.updateOrderStatusFailed
);

module.exports = routes;
