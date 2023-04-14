const mongoose = require("mongoose");

const showTimeSchema = new mongoose.Schema(
  {
    movieDay: {
      type: String,
    },
    time: {
      type: String,
    },
    screenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShowTime", showTimeSchema);
