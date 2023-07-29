const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: Sequelize.STRING,
  isPremiumUser: Sequelize.BOOLEAN,
});

module.exports = User;
