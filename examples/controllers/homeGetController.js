const mongoose = require("mongoose");

// db connention handler
const db = require("../db/db");
// modals
const Poll = require("../modals/modal");

module.exports = homeGetController = async function (req, res) {
  const client = await db();
  if (client === "connected") {
    await Poll.find({})
      .then(function (allPolls) {
        mongoose.connection.close().then(function () {
          console.log("Mongoose connection closed");
        });
        return allPolls;
      })
      .then(function (allPolls) {
        res.status(201).json(allPolls);
      })
      .catch((err) => {
        mongoose.connection.close().then(function () {
          console.log("Mongoose connection closed");
        });
        res.status(501).send({ massage: "Something went wrong." });
      });
  } else {
    res.status(501).send({ massage: "Something went wrong." });
  }
};
