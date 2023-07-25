const { where } = require("sequelize");
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

module.exports.userAuth = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log("email and password are", email, password);
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user.dataValues.password === password) {
        res.json({
          success: true,
          message: "User successfully logged in",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Incorrect Password",
        });
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "User with the provided email does not exist" });
    });
};
