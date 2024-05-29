const express = require("express")
const router = express.Router()
const chatController = require("../controller/ChatController")
const { verifyToken } = require("../middleware/verifyToken")

router.get("/", verifyToken, chatController.getChat)
router.post("/new", verifyToken, chatController.newChat)
router.post("/add", verifyToken, chatController.addChat)

module.exports = router
