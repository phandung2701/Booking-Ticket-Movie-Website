const express = require('express');
const router = express.Router();

const { all,addShowTime,updateShowTime,deleteShowTime } = require('../controllers/showtime.controller');

router.get('/', all);
router.post('/create', addShowTime);
router.post('/update', updateShowTime);
router.post('/delete', deleteShowTime);

module.exports = router;
