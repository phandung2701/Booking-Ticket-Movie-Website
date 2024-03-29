const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);
