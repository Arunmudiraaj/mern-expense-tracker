const Expense = require("../models/expenses");
module.exports.getAllExpenses = (req, res) => {
  req.user.getExpenses().then((result) => {
    console.log(result);
    console.log("use r is", req.user);
    const data = result.map((ele) => ele.dataValues);
    // console.log();

    res.json({
      expenses: data,
      isPremiumUser: req.user.dataValues.isPremiumUser,
    });
  });
};

module.exports.addExpense = (req, res) => {
  console.log("Add expense body id", req.body);
  console.log(req.user);
  req.user
    .createExpense(req.body)
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
  Expense.findOne({
    where: {
      id: id,
      userId: req.user.dataValues.id,
    },
  })
    .then((toBeDeleted) => {
      return toBeDeleted.destroy();
    })
    .then((result) => {
      console.log(result);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};
