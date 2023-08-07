const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "expense-tracker",
  "root",
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
  }
);
module.exports = sequelize;
