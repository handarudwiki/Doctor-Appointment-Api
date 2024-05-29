const express = require("express")
const router = express.Router()
const chatController = require("../controller/ChatController")

router.get("/:id", chatController.getChat)
router.post("/new", chatController.newChat)
router.post("/add", chatController.addChat)

module.exports = router
