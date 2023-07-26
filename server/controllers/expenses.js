const Expense = require("../models/expenses");
module.exports.getAllExpenses = (req, res) => {
  Expense.findAll().then((result) => {
    console.log(result);
    const data = result.map((ele) => ele.dataValues);
    console.log(data);

    res.json(data);
  });
};

module.exports.addExpense = (req, res) => {
  console.log(req.body);
  Expense.create(req.body)
    .then((result) => {
      console.log(result);
      res.json(result.dataValues);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
};

module.exports.deleteExpense = (req, res) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((e) => {
      return e.destroy();
    })
    .then((result) => {
      console.log(result);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
