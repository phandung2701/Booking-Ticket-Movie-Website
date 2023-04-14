const mongoose = require("mongoose");

const MovieGerneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MovieGerne", MovieGerneSchema);
