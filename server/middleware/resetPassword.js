const User = require("../models/user");

module.exports.resetPassword = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ where: { email: email } })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.status(501).json({
          message:
            "User with the provided email does not have an account registered!",
        });
        return;
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
