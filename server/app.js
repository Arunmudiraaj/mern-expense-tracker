const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user");
const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const User = require("./models/user");
const Expense = require("./models/expenses");
const Order = require("./models/order");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);
app.use((req, res) => {
  res.send("<h2>Error 404</h2>");
});
sequelize.sync().then(() => {
  app.listen(8080);
});
