const { json } = require("express");
const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    sid:{
      type:String
    },
    movie: {
      type: Array,
    },
    cinema:{
      type:Array
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
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "cancel", "draft"],
      default: "active",
    },
    customerId: {
      type: String,
    },
    seat: {
      type: Array,
    },
    comboId: {
      type: Array
    },
    foodId: {
      type: Array
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
