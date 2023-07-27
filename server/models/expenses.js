const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  desc: Sequelize.STRING,
  category: Sequelize.STRING,
  amount: Sequelize.INTEGER,
});

module.exports = Expense;
