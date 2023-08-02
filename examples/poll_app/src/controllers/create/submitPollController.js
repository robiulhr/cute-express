// database
const mongoose = require("mongoose");
const db = require("../../db/db");

// modals
const Poll = require("../../modals/modal");

module.exports = submitPollController = async function (req, res) {
  const body = req.body;
  const client = await db();
  if (client === "connected") {
    const data = {
      name: body.name,
      description: body.description,
      options: body.options.map((ele) => {
        return { name: ele, vote: 0 };
      }),
      totalVote: 0,
    };
    try {
      await Poll.create(data);
      await mongoose.connection.close().then(function () {
        console.log("Mongoose connection closed");
      });
      await res.status(301).redirect("/");
    } catch (err) {
      await mongoose.connection.close().then(function () {
        console.log("Mongoose connection closed");
      });
      res.status(500).send({ massage: "something went wrong.", error: err });
    }
  } else {
    res.status(400).send({ massage: "something went wrong." });
  }
};
