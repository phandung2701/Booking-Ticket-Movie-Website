const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema(
  {
    row: {
      type: String,
    },
    numberSeat: {
      type: String,
    },
    screenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
    },
    typeChair: {
      type: String,
      enum: ["VIP", "Normal", "Couple chair"],
      default: "Normal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seat", SeatSchema);
