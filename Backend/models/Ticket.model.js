const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    showTmeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShowTime",
    },
    tiketType: {
      type: String,
      enum: ["VIP", "Normal", "Couple chair"],
      default: "Normal",
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
