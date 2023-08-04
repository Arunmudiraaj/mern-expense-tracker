const User = require("../models/user");
const Expenses = require("../models/expenses");
const sequelize = require("../util/database");
// const { Json } = require("sequelize/types/utils");
const S3Services = require("../services/S3Services");

module.exports.getLeaderBoard = async (req, res) => {
  const leaderboad = await User.findAll({
    attributes: ["id", "userName", "totalExpenses"],
  });

  const mappedData = leaderboad.map((item) => item.dataValues);
  mappedData.sort((a, b) => b.totalExpenses - a.totalExpenses);
  res.json(mappedData);
};
module.exports.downloadData = async (req, res) => {
  try {
    if (!req.user.dataValues.isPremiumUser) {
      throw new Error(
        JSON.stringify({ message: "User is not a premium user" })
      );
    }
    const expenses = await req.user.getExpenses();
    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `Expenses${req.user.id}/${new Date()}.txt`;
    const fileUrl = await S3Services.uploadToS3(stringifiedExpenses, filename);
    console.log("Result is", fileUrl);
    const dbRes = await req.user.createDownloadedFile({ fileUrl });
    console.log("DB res is", dbRes);

    res.status(200).json({ success: true, fileUrl, obj: dbRes.dataValues });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, fileUrl: "", error: e });
  }
};

module.exports.getAllLinks = async (req, res) => {
  try {
    const allData = await req.user.getDownloadedFiles();
    const data = allData.map((item) => item.dataValues);
    // console.log("ALL List is ", allData);
    res.json({ allUrls: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
