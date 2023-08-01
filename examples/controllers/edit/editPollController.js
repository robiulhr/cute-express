 // database
 const mongoose = require("mongoose");
 const db = require("../../db/db");
 
 // modals
 const Poll = require("../../modals/modal");


module.exports = editPollController = async function(req,res){
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
        res.render("./pages/create", {
          title: poll.name,
          poll,
          error: null,
        });
      })
      .catch((err) => {
        console.log(err);
        mongoose.connection.close().then(function () {
          console.log("Mongoose connection closed");
        });
        res.render("./pages/create", {
          title: "Something went wrong.",
          poll: null,
          error: "Something went wrong. Please, try again later.",
        });
      });
  } else {
    res.render("./pages/create", {
      title: "Something went wrong.",
      poll: null,
      error: "Something went wrong. Please, try again later.",
    });
  }
}