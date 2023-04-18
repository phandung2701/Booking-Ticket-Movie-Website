const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { show,booked } = require('../controllers/seat.controller');

router.get('/', protect, show);
router.post('/booked',booked)
module.exports = router;
