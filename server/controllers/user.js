const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function getJsonWebToken(id, name) {
  return jwt.sign({ userId: id, userName: name }, "ArunSecretKey");
}
module.exports.userSignUp = (req, res) => {
  const { userName, email, password } = req.body;
  // User.create({
  //   userName: userName,
  //   email: email,
  //   password: password,
  // })
  //   .then((result) => {
  //     console.log("Row created successfully");
  //     console.log(result);
  //     res.end();
  //   })
  //   .catch((err) => {
  //     console.log(err.name);
  //     if (err.name === "SequelizeUniqueConstraintError") {
  //       res.status(500).json({ message: "Email Already Exist" });
  //     } else {
  //       res.status(501).json({ message: "Something went wrong" });
  //     }
  //   });
  try {
    bcrypt.hash(password, 10, async (e, hash) => {
      console.log(e);
      User.create({
        userName: userName,
        email: email,
        password: hash,
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
    });
  } catch (err) {
    console.log("error is", err);
    res.status(500).json(err);
  }
};

module.exports.userAuth = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log("email and password are", email, password);
  User.findOne({ where: { email: email } })
    .then((user) => {
      // if (user.dataValues.password === password) {
      //   res.json({
      //     success: true,
      //     message: "User successfully logged in",
      //   });
      // } else {
      //   res.status(401).json({
      //     success: false,
      //     message: "Incorrect Password",
      //   });
      // }
      bcrypt.compare(password, user.dataValues.password, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Something went wrong" });
        }
        if (result) {
          res.json({
            success: true,
            message: "User successfully logged in",
            token: getJsonWebToken(user.id, user.userName),
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Incorrect Password",
          });
        }
      });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "User with the provided email does not exist" });
    });
};

module.exports.getUsersCount = (req, res) => {
  User.count().then((result) => {
    console.log(result);
    res.json({ count: result });
  });
};
