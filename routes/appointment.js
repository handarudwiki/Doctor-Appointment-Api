const express = require("express")
const router = express.Router()
const AppointmentController = require("../controller/AppointmentController")

router.get("/patient/:id", AppointmentController.getAppointmentPatient)
router.get("/doctor/:id", AppointmentController.getAppointmentDoctor)
router
  .route("/:id")
  .get(AppointmentController.getDetailAppointmet)
  .put(AppointmentController.updateAppointment)
router.route("/").post(AppointmentController.addAppointment)

module.exports = router
