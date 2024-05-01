const express = require('express');
const router = express.Router();
const AppointmentController = require('../controller/AppointmentController')

router.route('/').get(AppointmentController.addAppointment)
router.get('/:id_user', AppointmentController.getAppointment)

module.exports = router