const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const AppointmentController = {
  getAppointmentPatient: async (req, res) => {
    const { id } = req.params
    try {
      const apppointment = await prisma.appointment.findMany({
        where: {
          patient_id: parseInt(id),
        },
        include: {
          doctor: true,
          patient: true,
        },
      })
      if (apppointment.length === 0) {
        res.status(404).json({
          message: "Data appointment tidak ditemukan",
          data: [],
        })
      }
      res.status(200).json({
        message: "Get appointment patient succesfully",
        data: apppointment,
      })
    } catch (error) {
      req.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  getAppointmentDoctor: async (req, res) => {
    try {
      const { id } = req.params
      const appointment = await prisma.appointment.findMany({
        where: {
          doctor_id: parseInt(id),
        },
        include: {
          doctor: true,
          patient: true,
        },
      })
      if (appointment.length === 0) {
        res.status(404).json({
          message: "Data appointment tidak ditemukan",
          data: [],
        })
      }
      res.status(200).json({
        message: "Get appointment doctor succesfully",
        data: appointment,
      })
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  getDetailAppointmet: async (req, res) => {
    try {
      const { id } = req.params
      const appointment = await prisma.appointment.findFirst({
        where: {
          id: parseInt(id),
        },
        include: {
          doctor: true,
          patient: true,
        },
      })

      if (appointment == null) {
        res.status(404).json({
          message: "Data appointment tidak ditemukan",
        })
      }

      res.status(200).json({
        message: "Get detail appointment succesfully",
        data: appointment,
      })
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan error",
        erorr: error.message,
      })
    }
  },

  addAppointment: async (req, res) => {
    try {
      const appointment = await prisma.appointment.create({
        data: {
          patient_id: parseInt(req.body.patient_id),
          doctor_id: parseInt(req.body.doctor_id),
          date: new Date(req.body.date),
          time: new Date(req.body.time),
        },
      })
      res.status(201).json({
        message: "Add appointment succesfully",
        data: appointment,
      })
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params
      const checkAppointment = await prisma.appointment.findFirst({
        where: {
          id: parseInt(id),
        },
      })

      if (checkAppointment == null) {
        res.status(404).json({
          message: "Data appointment tidak ditemukan",
        })
      }

      const appointment = await prisma.appointment.update({
        where: {
          id: parseInt(id),
        },
        data: {
          patient_id: parseInt(req.body.patient_id),
          doctor_id: parseInt(req.body.doctor_id),
          date: new Date(req.body.date),
          time: new Date(req.body.time),
          status: req.body.status,
        },
      })

      res.status(200).json({
        message: "Update appointment succesfully",
        data: appointment,
      })
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },
}

module.exports = AppointmentController
