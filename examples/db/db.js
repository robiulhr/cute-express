const mongoose = require("mongoose");

const connectDb = async () => {
  let client;
  await mongoose
    .connect("mongodb://127.0.0.1:27017/poll_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(function () {
      console.log("CONNECTED TO DATABASE");
      client = "connected"
    })
    .catch(function (err) {
      console.error("DATABASE CONNECTION FAILED!");
      client = "connection failed"
    });
    return client
  };

module.exports = connectDb;
