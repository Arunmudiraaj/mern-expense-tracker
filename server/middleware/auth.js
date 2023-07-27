const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports.authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    const user = jwt.verify(token, "ArunSecretKey");
    console.log(user);
    User.findByPk(user.userId)
      .then((userRow) => {
        req.user = userRow;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (e) {
    console.log(e);
    return res.status(401).json({ success: false });
  }
};
