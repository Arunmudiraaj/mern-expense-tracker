const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const ResetPassword = sequelize.define("resetPassword", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  isActive: Sequelize.BOOLEAN,
});

module.exports = ResetPassword;
