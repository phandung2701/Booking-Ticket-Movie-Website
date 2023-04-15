const asyncHandler = require('../helpers/async');
const generateDigitCode = require('../helpers/generateDigitCode');
const Province = require('../models/Province.model');

exports.all = asyncHandler(async (req, res, next) => {
  const province = await Province.find();

  return res.status(200).json({
    success: true,
    province
  });
});

exports.addProvince = asyncHandler(async (req, res, next) => {
    const {name} = req.body
    const province = await Province.create({
        sid:generateDigitCode(),
        name,
    });
  
    return res.status(200).json({
      success: true,
      province
    });
  });