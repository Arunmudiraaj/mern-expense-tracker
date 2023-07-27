const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const User = require("./models/user");
const Expense = require("./models/expenses");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
app.use((req, res) => {
  res.send("<h2>Error 404</h2>");
});
sequelize.sync().then(() => {
  app.listen(8080);
});
