const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema(
  {
    sid: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Province", ProvinceSchema);
