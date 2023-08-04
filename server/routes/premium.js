const express = require("express");
const premiumController = require("../controllers/premium");
const authMiddleware = require("../middleware/auth");
const routes = express.Router();
routes.get("/getleaderboard", premiumController.getLeaderBoard);
routes.get(
  "/download",
  authMiddleware.authenticate,
  premiumController.downloadData
);

routes.get(
  "/getdownloadlinks",
  authMiddleware.authenticate,
  premiumController.getAllLinks
);
module.exports = routes;
