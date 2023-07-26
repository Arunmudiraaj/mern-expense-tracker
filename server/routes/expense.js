const express = require("express");
const routes = express.Router();
const Expense = require("../models/expenses");
const expenseControllers = require("../controllers/expenses");
routes.post("/add", expenseControllers.addExpense);
routes.get("/all", expenseControllers.getAllExpenses);
routes.delete("/delete/:id", expenseControllers.deleteExpense);
module.exports = routes;
