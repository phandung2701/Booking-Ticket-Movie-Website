const asyncHandler = require('../helpers/async');
const generateDigitCode = require('../helpers/generateDigitCode');
const BookingModel = require('../models/Booking.model');
const CustomerModel = require('../models/Customer.model');

exports.all = asyncHandler(async (req, res, next) => {
  const booked = await BookingModel.aggregate([
    {
      $lookup:
        {
          from: "customers",
          localField: "customerId",
          foreignField: "sid",
          as: "customer"
        }
    },
  ]).sort({createdAt: -1});

  return res.status(200).json({
    success: true,
    booked
  });
});

exports.ticketBooked = asyncHandler(async (req, res, next) => {
  const user = await CustomerModel.findById(req.user.id);
  const booked = await BookingModel.find({customerId:user.sid}).sort({createdAt: -1});
  
  return res.status(200).json({
    success: true,
    booked
  });
});
/**
 * @description thêm rạp
 * @route [POST] /api/v1/admin/addCinema
 * @access PUBLIC
 */
exports.bookingTicket = asyncHandler(async (req, res, next) => {
  const {movie,cinema,price,showTimeId,movieDay,time,foodId,comboId,seat} = req.body
  const user = await CustomerModel.findById(req.user.id);
  const booking = await BookingModel.create({
    sid: generateDigitCode(16),
    movie,
    customerId : user.sid,
    movieDay,
    cinema,
    time,
    price,
    showTimeId,
    foodId,
    comboId,
    seat 
  });

  return res.status(200).json({
    success: true,
    booking
    
  });
});

exports.searchTicket = asyncHandler(async (req, res, next) => {
  const {cinema,movie,movieDay,time} = req.body
  let filter  = {}
  if(cinema) filter["cinema"] = { $elemMatch : {sid:cinema}}
  if(movie) filter["movie"]= { $elemMatch : {sid:movie}}
  if(movieDay) filter["movieDay"] = {$eq : movieDay}
  if(time) filter["time"] = time
  const booking = await BookingModel.aggregate([
    {
      $lookup:
        {
          from: "customers",
          localField: "customerId",
          foreignField: "sid",
          as: "customer"
        }
    },
    {$match : filter}
  ]).sort({createdAt: -1});

  return res.status(200).json({
    success: true,
    booking
    
  });
});
