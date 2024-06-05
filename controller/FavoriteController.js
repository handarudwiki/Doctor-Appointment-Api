const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { add } = require("date-fns")

const FavoriteController = {
  getFavorite: async (req, res) => {
    try {
      const response = await prisma.favorite.findMany({
        where: {
          patient_id: req.user,
        },
        include: {
          doctor: {
            include: {
              user: true,
            },
          },
        },
      })

      if (response.length == 0) {
        return res.status(404).json({
          message: "Data favorite tidak ditemukan",
          data: [],
        })
      }

      return res.status(200).json({
        message: "Get favorite user succesfully",
        data: response,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  addFavorite: async (req, res) => {
    try {
      const { doctor_id } = req.body
      const response = await prisma.favorite.create({
        data: {
          patient_id: req.user,
          doctor_id: doctor_id,
        },
      })

      return res.status(201).json({
        message: "Add favorite user succesfully",
        data: response,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },
}

module.exports = FavoriteController
