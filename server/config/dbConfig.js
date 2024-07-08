const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;
const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to Db");
  } catch (e) {
    console.log("Error: ", e);
  }
};

module.exports = connectDb;