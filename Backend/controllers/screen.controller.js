const asyncHandler = require('../helpers/async');
const generateDigitCode = require('../helpers/generateDigitCode');
const Screen = require('../models/Screen.model');

exports.all = asyncHandler(async (req, res, next) => {
  const screen = await Screen.find().sort({createdAt: -1});

  return res.status(200).json({
    success: true,
    screen
  });
});

/**
 * @description thêm rạp
 * @route [POST] /api/v1/admin/addScreen
 * @access PUBLIC
 */
exports.addScreen = asyncHandler(async (req, res, next) => {
  const {name,cinemaId} = req.body
  const screen = await Screen.create({
    sid: generateDigitCode(),
    name,
    cinemaId
  });

  return res.status(200).json({
    success: true,
    screen
  });
});

/**
 * @description sửa rạp
 * @route [POST] /api/v1/admin/updateScreen
 * @access PUBLIC
 */
exports.updateScreen = asyncHandler(async (req, res, next) => {
  const {sid,name,cinemaId} = req.body
  const screen = await Screen.updateOne({sid}, { $set: { name,cinemaId } }, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    screen
  });
});

/**
 * @description xóa rạp
 * @route [POST] /api/v1/admin/deleteScreen
 * @access PUBLIC
 */
exports.deleteScreen = asyncHandler(async (req, res, next) => {
  const {sid} = req.body
  const screen = await Screen.deleteOne({sid});

  return res.status(200).json({
    success: true,
    screen
  });
});