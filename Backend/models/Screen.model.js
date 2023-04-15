const mongoose = require("mongoose");

const ScreenSchema = new mongoose.Schema(
  {
    sid: {
      type: String,
    },
    name: {
      type: String,
    },
    cinemaId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Cinemal",
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Screen", ScreenSchema);
