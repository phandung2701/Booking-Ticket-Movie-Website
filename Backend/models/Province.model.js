const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Province", ProvinceSchema);
