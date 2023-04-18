const ErrorResponse = require('../utils/errorResponse');
const asyncHanler = require('../helpers/async');

const Ticket = require('../models/Ticket.model');
const BookingModel = require('../models/Booking.model');

exports.show = asyncHanler(async (req, res, next) => {
  const { fid, cid, st } = req.query;
  const format_st = st.slice(0, 2) + ':' + st.slice(2, st.length);

  const ticket = await Ticket.find({
    filmId: fid,
    cinemaId: cid,
    showTime: format_st
  });

  const listBookedTickets = [];

  for (let i = 0; i < ticket.length; ++i) {
    if (ticket[i]['status'] === 'booked')
      listBookedTickets.push(ticket[i]['seat']);
  }

  res.status(200).json({
    success: true,
    seat: listBookedTickets
  });
});

exports.booked = asyncHanler(async (req, res, next) => {
  const { showTimeId } = req.body;
  let booked = await BookingModel.find({showTimeId}).sort({createdAt: -1})
  let seat = booked.reduce((acc,curr)=> ([...acc,...curr.seat]),[])
  res.status(200).json({
    success: true,
    booked: seat
  });
});
