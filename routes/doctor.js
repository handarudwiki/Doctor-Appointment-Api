const express = require('express');
const router = express.Router();
const {getAllDoctor, getDoctorById} = require('../controller/DoctorController.js')
const {verifyToken} = require('../middleware/verifyToken.js')

/* GET home page. */
router.get('/',getAllDoctor);
router.get('/:id',getDoctorById);

module.exports = router;
