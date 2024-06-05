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
              rating: true,
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

      for (let i = 0; i < response.length; i++) {
        if (response[i].doctor.rating.length > 0) {
          let totalRating = 0
          for (let j = 0; j < response[i].doctor.rating.length; j++) {
            totalRating += response[i].doctor.rating[j].rating
          }

          response[i].doctor = {
            ...response[i].doctor,
            averageRatting: totalRating / response[i].doctor.rating.length,
            countRating: response[i].doctor.rating.length,
          }
        } else {
          response[i].doctor = {
            ...response[i].doctor,
            averageRatting: 0,
            countRating: 0,
          }
        }
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

  checkFavorite: async (req, res) => {
    try {
      const { doctor_id } = req.body
      const response = await prisma.favorite.findFirst({
        where: {
          patient_id: req.user,
          doctor_id: doctor_id,
        },
      })

      if (response) {
        return res.status(200).json(true)
      }

      return res.status(200).json(false)
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  deleteFavorite: async (req, res) => {
    try {
      const doctorId = parseInt(req.body.doctor_id)
      const response = await prisma.favorite.deleteMany({
        where: {
          AND: [{ patient_id: req.user }, { doctor_id: doctorId }],
        },
      })

      return res.status(200).json({
        message: "Delete favorite user succesfully",
        data: response,
      })
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Data favorite tidak ditemukan",
          data: [],
        })
      }
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  countFavorite: async (req, res) => {
    try {
      const id = parseInt(req.params.doctor_id)
      const response = await prisma.favorite.count({
        where: {
          doctor_id: id,
        },
      })

      return res.status(200).json({
        message: "Count favorite user succesfully",
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
