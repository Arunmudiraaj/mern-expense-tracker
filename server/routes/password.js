const express = require("express");
const paswordController = require("../controllers/password");
const routes = express.Router();
routes.post("/forgotpassword", paswordController.forgotPassword);
module.exports = routes;
