const User = require("../models/user");
const Expenses = require("../models/expenses");
const sequelize = require("../util/database");
module.exports.getLeaderBoard = async (req, res) => {
  const leaderboad = await User.findAll({
    attributes: [
      "id",
      "userName",
      [sequelize.fn("sum", sequelize.col("expenses.amount")), "total_cost"],
    ],
    include: [
      {
        model: Expenses,
        attributes: [],
      },
    ],
    group: ["user.id"],
    order: [["total_cost", "DESC"]],
  });
  console.log(leaderboad);
  const mappedData = leaderboad.map((item) => item.dataValues);

  res.json(mappedData);
};
