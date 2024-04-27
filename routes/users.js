var express = require('express');
var router = express.Router();
const {register, login, update} = require('../controller/UserController.js')
const {verifyToken} = require('../middleware/verifyToken.js')

/* GET home page. */

router.post('/register', register)
router.post('/login', login)
router.put('/update-users',verifyToken, update)

module.exports = router;
