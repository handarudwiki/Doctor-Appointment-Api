const express = require('express');
const router = express.Router();
const {register, login, update, detailUser} = require('../controller/UserController.js')
const {verifyToken} = require('../middleware/verifyToken.js')

/* GET home page. */

router.post('/register', register)
router.post('/login', login)
router.put('/update-users',verifyToken, update)
router.get('/users', verifyToken, detailUser)


module.exports = router;
