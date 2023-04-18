const mongoose = require("mongoose");

const MovieGenre = new mongoose.Schema(
  {
    sid:{
      type : String
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MovieGenre", MovieGenre);
