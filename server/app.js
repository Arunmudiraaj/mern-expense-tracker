const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);
app.use((req, res) => {
  res.send("<h2>Error 404</h2>");
});
sequelize.sync().then(() => {
  app.listen(8080);
});
