const mongoose = require("mongoose");

const ComboFoodSchema = new mongoose.Schema(
  {
    comboId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Combo",
    },
    description: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComboFood", ComboFoodSchema);
