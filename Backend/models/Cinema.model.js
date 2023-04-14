const mongoose = require("mongoose");

const CinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    provinceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cinema", CinemaSchema);
