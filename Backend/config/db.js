const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
console.log("MongoDB URL:", MONGODB_URL); // Debugging the connection string

const connect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("DB Connection Successful");
    })
    .catch((err) => {
      console.error("DB Connection Failed:", err);
      console.error("Error details:", err.stack);
      process.exit(1); // Exit process if connection fails
    });
};

connect();
