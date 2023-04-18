const asyncHandler = require('../helpers/async');
const generateDigitCode = require('../helpers/generateDigitCode');
const MovieGenre = require('../models/MovieGenre.model');

exports.all = asyncHandler(async (req, res, next) => {
  const movieGenre = await MovieGenre.find();

  return res.status(200).json({
    success: true,
    movieGenre
  });
});

exports.addMovieGenre = asyncHandler(async (req, res, next) => {
    const {name} = req.body
    const movieGenre = await MovieGenre.create({
        sid:generateDigitCode(),
        name,
    });
  
    return res.status(200).json({
      success: true,
      movieGenre
    });
  });