const express = require('express');
const router = express.Router();

const {
  all,
  create,
  detail,
  detail_v2,
  update,
  searchName,
  search,
} = require('../controllers/movie.controller');
const { protect, hasAuthorization } = require('../middleware/auth');

router.get('/', all);
router.post('/search', search);
router.post('/', protect, hasAuthorization('admin'), create);
router.put('/:id', protect, hasAuthorization('admin'), update);
router.get('/:id', detail);
router.post('/:id', detail_v2);
router.post('/search/name', searchName);

module.exports = router;
