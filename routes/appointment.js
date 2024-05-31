const express = require("express")
const router = express.Router()
const AppointmentController = require("../controller/AppointmentController")
const { verifyToken } = require("../middleware/verifyToken")

router.get("/patient", verifyToken, AppointmentController.getAppointmentPatient)
router.get("/doctor", verifyToken, AppointmentController.getAppointmentDoctor)
router
  .route("/:id")
  .get(verifyToken, AppointmentController.getDetailAppointmet)
  .put(verifyToken, AppointmentController.updateAppointment)
router.route("/").post(verifyToken, AppointmentController.addAppointment)
router.get(
  "/clock/:doctor_id",
  verifyToken,
  AppointmentController.getClockAppointment
)

module.exports = router
