const mongoose = require("mongoose");

const ComboSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Combo", ComboSchema);
