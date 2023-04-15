const mongoose = require("mongoose");

const showTimeSchema = new mongoose.Schema(
  {
    sid:{
      type: String,
    },
    movieDay: {
      type: String,
    },
    time: {
      type: String,
    },
    screenId: {
      type: String,
    },
    movieId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShowTime", showTimeSchema);
