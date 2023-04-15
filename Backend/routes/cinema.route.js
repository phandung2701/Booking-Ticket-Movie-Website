const express = require('express');
const router = express.Router();

const { all,addCinema,updateCinema,deleteCinema } = require('../controllers/cinema.controller');

router.get('/', all);
router.post('/create', addCinema);
router.post('/update', updateCinema);
router.post('/delete', deleteCinema);

module.exports = router;
