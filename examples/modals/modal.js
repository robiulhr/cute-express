const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    default: "No Description Provided.",
  },
  options: [
    {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      vote: { type: Number, required: true },
    },
  ],
  totalVote: { type: Number, required: true },
});

module.exports = mongoose.model("Poll", pollSchema);
