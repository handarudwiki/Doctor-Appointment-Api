var express = require('express');
var router = express.Router();
const {register, login} = require('../controller/UserController.js')

/* GET home page. */

router.post('/register', register)
router.post('/login', login)

module.exports = router;
