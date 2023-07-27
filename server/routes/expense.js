const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/auth");
const Expense = require("../models/expenses");
const expenseControllers = require("../controllers/expenses");
routes.post("/add", authMiddleware.authenticate, expenseControllers.addExpense);
routes.get(
  "/all",
  authMiddleware.authenticate,
  expenseControllers.getAllExpenses
);
routes.delete(
  "/delete/:id",
  authMiddleware.authenticate,
  expenseControllers.deleteExpense
);
module.exports = routes;
