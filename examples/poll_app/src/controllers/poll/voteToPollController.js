// database
const mongoose = require("mongoose");
const db = require("../../db/db");

// modals
const Poll = require("../../modals/modal");

module.exports = voteToPollController = async function (req, res) {
  const pollId = req.params.id;
  const voteFor = req.body.option;
  const client = await db();
  if (client === "connected") {
    await Poll.findOneAndUpdate(
      { "options._id": voteFor },
      { $inc: { "options.$.vote": 1, totalVote: 1 } }
    )
      .then(function (poll) {
        mongoose.connection.close().then(function () {
          console.log("Mongoose connection closed");
        });
      })
      .then(function (poll) {
        res.redirect(`/polls/${pollId}`);
      })
      .catch((err) => {
        mongoose.connection.close().then(function () {
          console.log("Mongoose connection closed");
        });
        res.json({
          massage:"something went wrong"
        });
      });
  } else {
    res.redirect(`/`);
  }
};
