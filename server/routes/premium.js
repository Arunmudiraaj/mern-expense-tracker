const express = require("express");
const premiumController = require("../controllers/premium");
const routes = express.Router();
routes.get("/getleaderboard", premiumController.getLeaderBoard);
module.exports = routes;
