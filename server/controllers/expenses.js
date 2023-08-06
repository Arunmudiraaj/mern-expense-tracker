const Expense = require("../models/expenses");
const sequelize = require("../util/database");
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

module.exports.addExpense = async (req, res) => {
  const txn = await sequelize.transaction();
  // console.log("Add expense body id", req.body);
  // console.log(req.user);
  try {
    const result = await req.user.createExpense(req.body, { transaction: txn });
    console.log(result);
    const newTotal = req.user.dataValues.totalExpenses
      ? parseInt(req.user.dataValues.totalExpenses) + parseInt(req.body.amount)
      : parseInt(req.body.amount);
    await req.user.update({ totalExpenses: newTotal }, { transaction: txn });
    res.json(result.dataValues);
    await txn.commit();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.deleteExpense = async (req, res) => {
  const txn = await sequelize.transaction();
  console.log("DELLETTed");

  try {
    const id = req.params.id;
    const toBeDeleted = await Expense.findOne({
      where: {
        id: id,
        userId: req.user.dataValues.id,
      },
    });

    await toBeDeleted.destroy({ transaction: txn });
    await req.user.update(
      {
        totalExpenses:
          parseInt(req.user.dataValues.totalExpenses) -
          parseInt(toBeDeleted.dataValues.amount),
      },
      { transaction: txn }
    );
    await txn.commit();
    res.end();
  } catch (err) {
    console.log("ERR IS", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getExpenses = async (req, res) => {
  const pageNumber = Number(req.params.number);
  const itemsPerPage = Number(req.params.perPage);
  try {
    const totalExpenses = await Expense.count({
      where: { userId: req.user.id },
    });
    const expenses = await req.user.getExpenses({
      offset: (pageNumber - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    console.log(totalExpenses);
    res.json({
      currentpage: pageNumber,
      expenses,
      hasNextPage: totalExpenses > pageNumber * itemsPerPage,
      hasPreviousPage: pageNumber > 1,
      nextPage: pageNumber + 1,
      previousPage: pageNumber - 1,
      lastPage: Math.ceil(totalExpenses / itemsPerPage),
      limit: itemsPerPage,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
