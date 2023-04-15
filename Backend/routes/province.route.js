const express = require('express');
const router = express.Router();

const { all,addProvince } = require('../controllers/province.controller');

router.get('/', all);
router.post('/add', addProvince);

module.exports = router;
