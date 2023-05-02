const asyncHandler = require('../helpers/async');
const generateDigitCode = require('../helpers/generateDigitCode');
const Cinema = require('../models/Cinema.model');

exports.all = asyncHandler(async (req, res, next) => {
  const cinema = await Cinema.aggregate([
    {
      $lookup:
        {
          from: "provinces",
          localField: "provinceId",
          foreignField: "sid",
          as: "province"
        }
    },
  ]).sort({createdAt: -1});

  return res.status(200).json({
    success: true,
    cinema
  });
});

/**
 * @description thêm rạp
 * @route [POST] /api/v1/admin/addCinema
 * @access PUBLIC
 */
exports.addCinema = asyncHandler(async (req, res, next) => {
  const {name,address,provinceId} = req.body
  const cinema = await Cinema.create({
    sid: generateDigitCode(),
    name,
    address,
    provinceId
  });

  return res.status(200).json({
    success: true,
    cinema
  });
});

/**
 * @description sửa rạp
 * @route [POST] /api/v1/admin/updateCinema
 * @access PUBLIC
 */
exports.updateCinema = asyncHandler(async (req, res, next) => {
  const {sid,name,address,provinceId} = req.body
  const cinema = await Cinema.updateOne({sid}, { $set: { name,address,provinceId } }, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    cinema
  });
});

/**
 * @description xóa rạp
 * @route [POST] /api/v1/admin/deleteCinema
 * @access PUBLIC
 */
exports.deleteCinema = asyncHandler(async (req, res, next) => {
  const {sid} = req.body
  const cinema = await Cinema.deleteOne({sid});

  return res.status(200).json({
    success: true,
    cinema
  });
});