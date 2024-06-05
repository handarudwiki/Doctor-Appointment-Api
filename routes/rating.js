const express = require("express")
const {
  createRating,
  getRating,
  getAllRating,
  checkRating,
} = require("../controller/RatingController")
const { veryfiPasien, verifyToken } = require("../middleware/verifyToken")
const router = express.Router()
/* GET home page. */
router.post("/", veryfiPasien, createRating)
router.get("/:doctorId", getAllRating)
router.get("/check/:appointmentId", verifyToken, checkRating)

module.exports = router
