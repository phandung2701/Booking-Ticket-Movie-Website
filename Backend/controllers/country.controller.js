const asyncHandler = require('../helpers/async');
const generateDigitCode = require('../helpers/generateDigitCode');
const Country = require('../models/Country.model');

exports.all = asyncHandler(async (req, res, next) => {
  const country = await Country.find();

  return res.status(200).json({
    success: true,
    country
  });
});

exports.addCountry = asyncHandler(async (req, res, next) => {
    const {name} = req.body
    const country = await Country.create({
        sid:generateDigitCode(),
        name,
    });
  
    return res.status(200).json({
      success: true,
      country
    });
  });