const express = require("express")
const router = express.Router()
const chatController = require("../controller/ChatController")
const { verifyToken, veryfiPasien } = require("../middleware/verifyToken")

router.get("/", verifyToken, chatController.getChat)
router.post("/add", verifyToken, chatController.addChat)
router.get("/detail/:doctor_id", veryfiPasien, chatController.getDetailChat)
router.get("/message/:chat_id", verifyToken, chatController.getMessage)
router.post("/open-chat", verifyToken, chatController.openChat)

module.exports = router
