const express = require('express');
const router = express.Router();

const { all,addCountry } = require('../controllers/country.controller');

router.get('/', all);
router.post('/add', addCountry);

module.exports = router;
