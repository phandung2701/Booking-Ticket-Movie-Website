const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    movienName: {
      type: String,
    },
    movieDay: {
      type: String,
    },
    time: {
      type: String,
    },
    price: {
      type: Number,
    },
    showTimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShowTime",
    },
    status: {
      type: String,
      enum: ["active", "cancel", "draft"],
      default: "active",
    },
    createAt: {
      type: Date,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    seat: {
      type: Array,
    },
    comboId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Combo",
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
