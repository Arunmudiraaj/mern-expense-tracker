const express = require("express");
const paswordController = require("../controllers/password");
const routes = express.Router();
const resetPasswordMiddleware = require("../middleware/resetPassword");
routes.get("/forgotpassword/:id", paswordController.resetPassword);
routes.post(
  "/forgotpassword",
  resetPasswordMiddleware.resetPassword,
  paswordController.forgotPassword
);

routes.post("/change/:resetId", paswordController.changePassword);

module.exports = routes;
