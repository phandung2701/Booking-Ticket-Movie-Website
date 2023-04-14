const mongoose = require("mongoose");

const ScreenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    cinemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinemal",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Screen", ScreenSchema);
