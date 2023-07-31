// database
const mongoose = require("mongoose");
const db = require("../../db/db");

// modals
const Poll = require("../../modals/modal");

module.exports = submitPollController = async function (req, res) {
  const body = req.body;
  console.log("console.log of request body", body);
  res.json({json:"hello world"})
  // const client = await db();
  // if (client === "connected") {
  //   const data = {
  //     name: body.title,
  //     description: body.description,
  //     options: body.options.map((ele) => {
  //       return { name: ele, vote: 0 };
  //     }),
  //     totalVote: 0,
  //   };
  //   try {
  //     await Poll.create(data);
  //     await mongoose.connection.close().then(function () {
  //       console.log("Mongoose connection closed");
  //     });
  //     res.status(301).redirect("/");
  //   } catch (err) {
  //     await mongoose.connection.close().then(function () {
  //       console.log("Mongoose connection closed");
  //     });
  //     res.status(301).redirect("/create");
  //   }
  // } else {
  //   res.status(401).send({ massage: "something went wrong." });
  // }
};
