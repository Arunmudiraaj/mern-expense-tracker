const User = require("../models/user");
const Expenses = require("../models/expenses");
const sequelize = require("../util/database");
module.exports.getLeaderBoard = async (req, res) => {
  const leaderboad = await User.findAll({
    attributes: ["id", "userName", "totalExpenses"],
  });

  const mappedData = leaderboad.map((item) => item.dataValues);
  mappedData.sort((a, b) => b.totalExpenses - a.totalExpenses);
  res.json(mappedData);
};
