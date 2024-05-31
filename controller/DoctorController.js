const { where } = require("sequelize")
const { User, Doctor, Rating } = require("../models")
const { string } = require("joi")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getAllDoctor = async (req, res) => {
  try {
    let doctors
    if (req.query.category) {
      doctors = await prisma.doctor.findMany({
        where: { categori: req.query.category },
        include: {
          user: true,
          rating: true,
        },
      })
    } else {
      doctors = await prisma.doctor.findMany({
        include: {
          user: true,
          rating: true,
        },
      })
    }
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].rating.length > 0) {
        let totalRating = 0
        for (let j = 0; j < doctors[i].rating.length; j++) {
          totalRating += doctors[i].rating[j].rating
        }
        doctors[i].averageRatting = totalRating / doctors[i].rating.length
        doctors[i].countRating = doctors[i].rating.length
      } else {
        doctors[i].averageRatting = 0
        doctors[i].countRating = 0
      }
    }

    return res.status(200).json({
      status: "success",
      data: doctors,
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

const getDoctorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const doctor = await prisma.doctor.findUnique({
      where: { id: id },
      include: {
        rating: true,
        user: true,
        appointments: true,
      },
    })
    if (!doctor) {
      return res.status(404).json({
        status: "error",
        message: "Dokter tidak ditemukan",
      })
    }
    const ratings = await Rating.findAll({
      where: { doctor_id: req.params.id },
    })

    let sumRating = 0
    for (let i = 0; i < ratings.length; i++) {
      sumRating += ratings[i].rating
    }

    const averageRatting = sumRating / ratings.length

    return res.status(200).json({
      status: "success",
      data: doctor,
      averageRatting,
    })
  } catch (error) {
    return res.status(500).json({
      status: "erorr",
      message: error.message,
    })
  }
}

const getDoctorByCategory = async (req, res) => {
  try {
    console.log("trash")
    const category = req.params.category.toLowerCase()
    const doctors = await prisma.doctor.findMany({
      where: { categori: category },
      include: {
        rating: true,
        user: true,
        appointments: true,
      },
    })
    if (doctors.length <= 0) {
      return res.status(404).json({
        status: "error",
        message: "Dokter di kategori ini tidak ditemukan",
      })
    }

    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].rating.length > 0) {
        let totalRating = 0
        for (let j = 0; j < doctors[i].rating.length; j++) {
          totalRating += doctors[i].rating[j].rating
        }
        doctors[i].averageRatting = totalRating / doctors[i].rating.length
        doctors[i].countRating = doctors[i].rating.length
      } else {
        doctors[i].averageRatting = 0
        doctors[i].countRating = 0
      }
    }

    return res.status(200).json({
      status: "success",
      data: doctors,
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

module.exports = {
  getAllDoctor,
  getDoctorById,
  getDoctorByCategory,
}
