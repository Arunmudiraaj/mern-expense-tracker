const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user");
const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const passwordRoutes = require("./routes/password");
const fs = require("fs");
const morgan = require("morgan");
const compression = require("compression");
const User = require("./models/user");
const Expense = require("./models/expenses");
const Order = require("./models/order");
const ResetPassword = require("./models/resetPassword");
const DownloadedFile = require("./models/downloadedFile");
const cors = require("cors");
const path = require("path");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", passwordRoutes);
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ResetPassword);
ResetPassword.belongsTo(User);

User.hasMany(DownloadedFile);
DownloadedFile.belongsTo(User);
app.use((req, res) => {
  res.send("<h2>Error 404</h2>");
});
sequelize.sync().then(() => {
  app.listen(process.env.PORT_NUMBER);
});
