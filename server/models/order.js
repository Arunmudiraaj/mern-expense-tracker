const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: Sequelize.STRING,
  paymentId: Sequelize.STRING,
  status: Sequelize.STRING,
});

module.exports = Order;
