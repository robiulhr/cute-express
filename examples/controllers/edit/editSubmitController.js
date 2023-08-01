// database
const mongoose = require("mongoose");
const db = require("../../db/db");

// modals
const Poll = require("../../modals/modal");

module.exports = editSubmitPollController = async function (req, res) {
  const pollId = req.params.id;
  const body = req.body;
  const client = await db();
  if (client === "connected") {
    try {
      await Poll.findOne({ _id: pollId }).then((poll) => {
        console.log(poll,"console from edit Submit controller")
        if (poll.name !== body.name) {
          poll.name = body.name;
          poll.markModified("name");
        }
        if (poll.description !== body.description) {
          poll.description = body.description;
          poll.markModified("description");
        }
        body.options.forEach(function (ele, ind) {
          if (!poll.options[ind].name || poll.options[ind].name !== ele) {
            poll.totalVote = poll.totalVote - poll.options[ind].vote;
            poll.options[ind] = { name: ele, vote: 0 };
            poll.options[ind].markModified("name");
            poll.options[ind].markModified("vote");
            poll.markModified("totalVote");
          }
        });
        poll.save();
      });
      res.status(301).redirect(`/polls/${pollId}`);
    } catch (err) {
      console.log(err)
      await mongoose.connection.close().then(function () {
        console.log("Mongoose connection closed");
      });
      res.status(301).redirect("/create");
    }
  } else {
    res.stats(400).json({
      massage: "Something went wrong. Please, try again later.",
    });
  }
};
