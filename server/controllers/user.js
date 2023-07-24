const User = require("../models/user");
module.exports.userSignUp = (req, res) => {
  const body = req.body;
  User.create({
    userName: body.userName,
    email: body.email,
    password: body.password,
  })
    .then((result) => {
      console.log("Row created successfully");
      console.log(result);
      res.end();
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(500).json({ message: "Email Already Exist" });
      } else {
        res.status(501).json({ message: "Something went wrong" });
      }
    });
};
