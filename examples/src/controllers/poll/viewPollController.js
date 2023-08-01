// database
const mongoose = require("mongoose");
const db = require("../../db/db");

// modals
const Poll = require("../../modals/modal");

module.exports = viewPollController = async function (req, res) {
  const pollId = req.params.id;
  const client = await db();
  if (client === "connected") {
    await Poll.find({ _id: pollId })
      .then(function (polls) {
        mongoose.connection.close().then(function () {
          console.log("Mongoose connection closed");
        });
        return polls[0];
      })
      .then(function (poll) {
        const result = [];
        poll.options.forEach((ele) => {
          const obj = {
            name: ele.name,
            vote: ele.vote,
            percentage:
              poll.totalVote !== 0
                ? (Number(ele.vote) * 100) / Number(poll.totalVote)
                : 0,
          };
          result.push(obj);
        });
        res.status(200).json({
          poll,
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        mongoose.connection.close().then(function () {
          console.log("Mongoose connection closed");
        });
        res.status(500).json({
          massage: "Something went wrong. Please, try again later.",
          error: err,
        });
      });
  } else {
    res.status(400).json({
      massage: "Something went wrong. Please, try again later.",
      error: err,
    });
  }
};
