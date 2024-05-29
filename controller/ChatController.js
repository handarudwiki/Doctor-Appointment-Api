const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const ChatController = {
  getChat: async (req, res) => {
    try {
      const chat = await prisma.chat.findMany({
        where: {
          OR: [{ doctor_id: req.user }, { patient_id: req.user }],
        },
        include: {
          patient: true,
          doctor: {
            include: {
              user: true,
            },
          },
          chat: true,
        },
      })

      if (chat.length == 0) {
        return res.status(404).json({
          message: "Data chat tidak ditemukan",
          data: [],
        })
      }

      res.status(200).json({
        message: "Get chat user succesfully",
        data: chat,
      })
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  newChat: async (req, res) => {
    const { patient_id, doctor_id } = req.body
    try {
      const newChat = await prisma.chat.create({
        data: {
          patient_id: parseInt(patient_id),
          doctor_id: parseInt(doctor_id),
        },
      })

      res.status(201).json({
        message: "Chat berhasil ditambahkan",
        data: newChat,
      })
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  addChat: async (req, res) => {
    try {
      const { sender_id, chat_id, message } = req.body
      const newChat = await prisma.chatMessage.create({
        data: {
          message,
          sender_id: parseInt(sender_id),
          chat_id: parseInt(chat_id),
        },
      })

      res.status(201).json({
        message: "Chat berhasil ditambahkan",
        data: newChat,
      })
    } catch {
      res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },
}

module.exports = ChatController
