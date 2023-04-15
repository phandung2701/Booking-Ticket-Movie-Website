const mongoose = require("mongoose");

const CinemaSchema = new mongoose.Schema(
  {
    sid: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    provinceId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cinema", CinemaSchema);
