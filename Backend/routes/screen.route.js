const express = require('express');
const router = express.Router();

const { all,addScreen,updateScreen,deleteScreen } = require('../controllers/screen.controller');

router.get('/', all);
router.post('/create', addScreen);
router.post('/update', updateScreen);
router.post('/delete', deleteScreen);

module.exports = router;
