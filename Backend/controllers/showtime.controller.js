const asyncHandler = require('../helpers/async');
const generateDigitCode = require('../helpers/generateDigitCode');
const ShowTime = require('../models/ShowTime.model');

exports.all = asyncHandler(async (req, res, next) => {
  const showTime = await ShowTime.find();

  return res.status(200).json({
    success: true,
    showTime
  });
});

/**
 * @description thêm rạp
 * @route [POST] /api/v1/admin/addShowTime
 * @access PUBLIC
 */
exports.addShowTime = asyncHandler(async (req, res, next) => {
  const {movieDay,time,screenId,movieId} = req.body
  const showTime = await ShowTime.create({
    sid: generateDigitCode(),
    movieDay,
    time,
    screenId,
    movieId
  });

  return res.status(200).json({
    success: true,
    showTime
  });
});

/**
 * @description sửa rạp
 * @route [POST] /api/v1/admin/updateShowTime
 * @access PUBLIC
 */
exports.updateShowTime = asyncHandler(async (req, res, next) => {
  const {sid,movieDay,time,screenId,movieId} = req.body
  const showTime = await ShowTime.updateOne({sid}, { $set: { movieDay,time,screenId,movieId } }, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    showTime
  });
});

/**
 * @description xóa rạp
 * @route [POST] /api/v1/admin/deleteShowTime
 * @access PUBLIC
 */
exports.deleteShowTime = asyncHandler(async (req, res, next) => {
  const {sid} = req.body
  const showTime = await ShowTime.deleteOne({sid});

  return res.status(200).json({
    success: true,
    showTime
  });
});