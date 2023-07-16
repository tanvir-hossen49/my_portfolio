require("dotenv").config();

const mongodbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xieksrd.mongodb.net/portfolio`;
const serverPort = process.env.PORT || 5001;

module.exports = {
  mongodbURL,
  serverPort,
};
