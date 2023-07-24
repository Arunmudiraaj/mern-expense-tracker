const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("expense-tracker", "root", "lonewarrior70951", {
  dialect: "mysql",
});
module.exports = sequelize;
