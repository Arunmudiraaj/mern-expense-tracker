const express = require("express");
const userControllers = require("../controllers/user");
const routes = express.Router();
routes.post("/signup", userControllers.userSignUp);
routes.post("/authentication", userControllers.userAuth);
routes.get("/count", userControllers.getUsersCount);

module.exports = routes;
