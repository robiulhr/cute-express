// database
const mongoose = require("mongoose");
const db = require("../../db/db");

// modals
const Poll = require("../../modals/modal");

module.exports = deletePollController = async function (req, res) {
  const pollId = req.params.id;
  const client = await db();
  if (client === "connected") {
    await Poll.findOneAndDelete({ _id: pollId })
      .then((poll) => {
        console.log(`Poll ${poll.name} has been deleted`);
        res.status(301).redirect("/");
      })
      .catch(function (err) {
        console.log(`Something went wrong deleting the poll`);
      });
  }
};
