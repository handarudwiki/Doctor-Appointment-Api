const express = require('express');
const { createRating, getRating, getAllRating } = require('../controller/RatingController');
const { veryfiPasien, verifyToken } = require('../middleware/verifyToken');
const router = express.Router();
/* GET home page. */
router.post('/',veryfiPasien,createRating);
router.get('/:doctorId',getAllRating);

module.exports = router;
