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
  const movie = await Movie.aggregate([
    {
      $lookup: {
        from: "moviegenres",
        localField: "genre",
        foreignField: "sid",
        as: "genre_info"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "sid",
        as: "country_info"
      }
    },
  ]).sort({createdAt: -1});

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
  const movies = movie.filter((e) => to_slug(e.name || '').includes(name));
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
  const { genre, country,type } = req.body;
  let movie;
  let obj = {}
  if(genre){
    obj.genre = genre
  } 
  if(country){
    obj.country = country
  } 
  if(type){
    obj.releaseDate = {[`$${type}`]: new Date().toISOString()}
  }
  
   movie = await Movie.aggregate([
      {
        $lookup: {
          from: "moviegenres",
          localField: "genre",
          foreignField: "sid",
          as: "genre_info"
        }
      },
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "sid",
          as: "country_info"
        }
      },
      {
        $match:obj
      }
    ]).sort({createdAt: -1});
 
  res.status(200).json({
    success: true,
    films: movie,
  });
});
/**
 * @description Thêm mới 1 bộ phim (admin)
 * @route [POST] /api/v1/movie
 * @access  PRIVATE
 */
exports.create = asyncHandler(async (req, res, next) => {
  const {
    nameFilm,
    description,
    director,
    country,
    category,
    movie_time,
    actor,
    age,
    releaseDate,
    background,
    avatar,
    trailer,
  } = req.body;
  const movie = await Movie.create({
    sid: generateDigitCode(),
    name:nameFilm, 
    description, 
    director, 
    country, 
    genre:category, 
    actor, 
    age,
    releaseDate, 
    background, 
    avatar, 
    trailer, 
    movieTime:movie_time
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
  const movie = await Movie.aggregate([
    {
      $lookup: {
        from: "moviegenres",
        localField: "genre",
        foreignField: "sid",
        as: "genre_info"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "sid",
        as: "country_info"
      }
    },
    {
      $match:{sid:id}
    }
  ])
  
  if (!movie) {
    return next(new ErrorResponse("Không tìm thấy phim", 404));
  }

  res.status(200).json({
    success: true,
    movie,
  });
});

exports.detail_v2 = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let date = new Date()
  const movie = await Movie.aggregate([
    {
      $lookup: {
        from: "moviegenres",
        localField: "genre",
        foreignField: "sid",
        as: "genre_info"
      }
    },
    {
      $lookup: {
        from: "countries",
        localField: "country",
        foreignField: "sid",
        as: "country_info"
      }
    },
    {
      $match:{sid:id}
    }
  ]);
  const cinema = await CinemaModel.find()
  const showTime = await ShowTimeModel.find({movieId:id,movieDay : {$gte: date.toISOString()}})
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
