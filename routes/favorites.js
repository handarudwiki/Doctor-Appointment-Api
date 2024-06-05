const express = require("express")
const router = express.Router()
const { verifyToken, veryfiPasien } = require("../middleware/verifyToken")
const FavoriteController = require("../controller/FavoriteController")

router
  .route("/")
  .get(veryfiPasien, FavoriteController.getFavorite)
  .post(veryfiPasien, FavoriteController.addFavorite)

module.exports = router
