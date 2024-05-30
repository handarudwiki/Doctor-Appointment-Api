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
              rating: true,
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
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  getDetailChat: async (req, res) => {
    try {
      const chat = await prisma.chat.findFirst({
        where: {
          AND: [
            { doctor_id: parseInt(req.params.doctor_id) },
            { patient_id: req.user },
          ],
        },
        include: {
          patient: true,
          doctor: {
            include: {
              user: true,
              rating: true,
            },
          },
          chat: true,
        },
      })

      if (chat == null) {
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
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  getMessage: async (req, res) => {
    try {
      const chat = await prisma.chatMessage.findMany({
        where: {
          chat_id: parseInt(req.params.chat_id),
        },
        include: {
          chat: true,
          sender: true,
        },
      })

      if (chat == null) {
        return res.status(404).json({
          message: "Data chat tidak ditemukan",
          data: [],
        })
      }

      res.status(200).json({
        message: "Get chat succesfully",
        data: chat,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  addChat: async (req, res) => {
    try {
      const { sender_id, message, receive_id } = req.body

      const chat = await prisma.chat.findFirst({
        where: {
          AND: [{ doctor_id: receive_id }, { patient_id: req.user }],
        },
      })

      if (chat.length == 0) {
        const openChat = await prisma.chat.create({
          data: {
            patient_id: req.user,
            doctor_id: parseInt(receive_id),
          },
        })
        const newChat = await prisma.chatMessage.create({
          data: {
            message,
            sender_id: req.user,
            chat_id: openChat.id,
          },
        })

        res.status(201).json({
          message: "Chat berhasil ditambahkan",
          data: newChat,
        })
      }

      const newChat = await prisma.chatMessage.create({
        data: {
          message,
          sender_id: parseInt(sender_id),
          chat_id: chat.id,
        },
      })

      res.status(201).json({
        message: "Chat berhasil ditambahkan",
        data: newChat,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },
}

module.exports = ChatController
