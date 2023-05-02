const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { all,bookingTicket,ticketBooked,searchTicket } = require('../controllers/booking.controller');

router.get('/', all);
router.post('/ticket',protect, ticketBooked);
router.post('/create',protect, bookingTicket);
router.post('/ticket/search',protect, searchTicket);

module.exports = router;
