const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    sid:{
      type: String,
    },
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
    genre: {
      type:String
    },
    releaseDate : {
      type:String
    },
    avatar: {
      type: String,
    },
    movieTime: {
      type: String,
    },
    background: {
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
