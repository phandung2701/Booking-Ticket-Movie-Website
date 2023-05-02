const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema(
  {
    sid: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", CountrySchema);
