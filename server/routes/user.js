const express = require("express");
const userControllers = require("../controllers/user");
const routes = express.Router();
routes.post("/signup", userControllers.userSignUp);

module.exports = routes;
