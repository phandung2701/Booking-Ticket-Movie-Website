const asyncHandler = require("../helpers/async");
const Movie = require("../models/Movie.model");
const ErrorResponse = require("../utils/errorResponse");
const generateDigitCode = require("../helpers/generateDigitCode");
const CinemaModel = require("../models/Cinema.model");
const ShowTimeModel = require("../models/ShowTime.model");
const ScreenModel = require("../models/Screen.model");
const ProvinceModel = require("../models/Province.model");

/**
 * @description Xem tất cả các bộ phim có trên website
 * @route [GET] /api/v1/movie
 * @access  PUBLIC
 */
exports.all = asyncHandler(async (req, res) => {
  const movie = await Movie.find();

  res.status(200).json({
    success: true,
    films: movie,
  });
});
/**
 * @description Tim kiem phim theo ten
 * @route [POST] /api/v1/movie/search/name
 * @access  PUBLIC
 */
exports.searchName = asyncHandler(async (req, res) => {
  const movie = await Movie.find();
  const { name } = req.body;
  function to_slug(str) {
    str = str.toLowerCase();

    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    str = str.replace(/([^0-9a-z-\s])/g, "");

    str = str.replace(/(\s+)/g, "-");

    str = str.replace(/^-+/g, "");

    str = str.replace(/-+$/g, "");

    return str;
  }
  const movies = movie.filter((e) => to_slug(e.nameFilm).includes(name));
  res.status(200).json({
    success: true,
    films: movies,
  });
});
/**
 * @description tim kiem phim theo the loai va quoc gia
 * @route [POST] /api/v1/movie/search/
 * @access  PUBLIC
 */
exports.search = asyncHandler(async (req, res, next) => {
  const movie = await Movie.find();
  const { genre, country } = req.body;
  function to_slug(str) {
    str = str.toLowerCase();

    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    str = str.replace(/([^0-9a-z-\s])/g, "");

    str = str.replace(/(\s+)/g, "-");

    str = str.replace(/^-+/g, "");

    str = str.replace(/-+$/g, "");

    return str;
  }
  function resData(genre, country, movie) {
    if (genre !== "Tất cả" && country !== "Tất cả") {
      return movie.filter(
        (e) =>
          e.country.toLowerCase().includes(country.toLowerCase()) &&
          to_slug(e.genre).includes(to_slug(genre))
      );
    }
    if (genre !== "Tất cả" && country === "Tất cả") {
      return movie.filter((e) =>
        to_slug(e.genre).includes(to_slug(genre))
      );
    }
    if (genre === "Tất cả" && country !== "Tất cả") {
      return movie.filter((e) =>
        e.country.toLowerCase().includes(country.toLowerCase())
      );
    }
    if (genre === "Tất cả" && country === "Tất cả") {
      return movie;
    }
  }
  const movies = resData(genre, country, movie);
  res.status(200).json({
    success: true,
    films: movies,
  });
});
/**
 * @description Thêm mới 1 bộ phim (admin)
 * @route [POST] /api/v1/movie
 * @access  PRIVATE
 */
exports.create = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    director,
    country,
    genre,
    actor,
    releaseDate,
    background,
    avatar,
    trailer,
  } = req.body;
  const movie = await Movie.create({
    sid: generateDigitCode(),
    name:name, 
    description, 
    director, 
    country, 
    genre:genre, 
    actor, 
    releaseDate, 
    background, 
    avatar, 
    trailer, 
  });


  return res.status(201).json({
    success: true,
    movie,
  });
});

/**
 * @description Xem chi tiết 1 bộ phim
 * @route [GET] /api/v1/movie/:id
 * @access PUBLIC
 */
exports.detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let date = new Date()
  const movie = await Movie.find({sid : id});
  const cinema = await CinemaModel.find()
  const showTime = await ShowTimeModel.find({movieId:id,movieDay : {$gt: date.toISOString()}})
  const screen = await ScreenModel.find()
  const province = await ProvinceModel.find()
  if (!movie) {
    return next(new ErrorResponse("Không tìm thấy phim", 404));
  }

  res.status(200).json({
    success: true,
    movie,
    cinema,
    showTime,
    screen,
    province
  });
});

/**
 * @description Cập nhật 1 bộ phim (Admin)
 * @route [PUT] /api/v1/movie/:id
 * @access PRIVATE
 */
exports.update = asyncHandler(async (req, res, next) => {
  delete req.body.cinema;
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json(movie);
});
