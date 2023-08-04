const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const DownloadedFile = sequelize.define("downloadedFile", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fileUrl: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = DownloadedFile;
