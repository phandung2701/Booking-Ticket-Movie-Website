const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên Phim không được để trống"],
    },
    description: {
      type: String,
      required: [true, "Nội dung phim không được để trống"],
    },
    actor: {
      type: String,
      required: [true, "Diễn viên chính của phim không được để trống"],
    },
    director: {
      type: String,
      required: [true, "Đạo diễn của phim không được để trống"],
    },
    gerne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MovieGerne",
    },
    imgAvt: {
      type: String,
    },
    imgPoster: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    createAt: {
      type: Date,
    },
    trailer: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Quốc gia không được để trống"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Movie", MovieSchema);
