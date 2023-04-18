const express = require('express');
const router = express.Router();

const { all,addMovieGenre } = require('../controllers/movieGenre.controller');

router.get('/', all);
router.post('/add', addMovieGenre);

module.exports = router;
