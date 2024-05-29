const express = require("express")
const router = express.Router()
const chatController = require("../controller/ChatController")

router.get("/patient/:id", chatController.getPatientChat)
router.get("/doctor/:id", chatController.getChatDoctor)
router.post("/new", chatController.newChat)
router.post("/add", chatController.addChat)

module.exports = router
