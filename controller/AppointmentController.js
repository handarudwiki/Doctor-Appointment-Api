const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const AppointmentController = {
  getAppointmentPatient: async (req, res) => {
    try {
      const apppointment = await prisma.appointment.findMany({
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
          patient: true,
        },
      })

      if (apppointment.length == 0) {
        return res.status(404).json({
          message: "Data appointment tidak ditemukan",
          data: [],
        })
      }
      const formattedAppointments = apppointment.map((appointment) => ({
        ...appointment,
        date: `${
          appointment.date.getDate() < 10
            ? "0" + appointment.date.getDate()
            : appointment.date.getDate()
        }-${
          appointment.date.getMonth() < 10
            ? "0" + appointment.date.getMonth()
            : appointment.date.getMonth()
        }-${appointment.date.getFullYear()}`,
        time: `${
          appointment.time.getUTCHours() < 10
            ? "0" + appointment.time.getUTCHours()
            : appointment.time.getUTCHours()
        }:${
          appointment.time.getUTCMinutes() < 10
            ? "0" + appointment.time.getUTCMinutes()
            : appointment.time.getUTCMinutes()
        }`,
      }))

      res.status(200).json({
        message: "Get appointment patient succesfully",
        data: formattedAppointments,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  getAppointmentDoctor: async (req, res) => {
    try {
      const id = req.user
      const appointment = await prisma.appointment.findMany({
        where: {
          doctor_id: req.user,
        },
        include: {
          doctor: {
            include: {
              user: true,
              rating: true,
            },
          },
          patient: true,
        },
      })

      if (appointment.length == 0) {
        return res.status(404).json({
          message: "Data appointment tidak ditemukan",
          data: [],
        })
      }

      const formattedAppointments = appointment.map((appointment) => ({
        ...appointment,
        date: `${
          appointment.date.getDate() < 10
            ? "0" + appointment.date.getDate()
            : appointment.date.getDate()
        }-${
          appointment.date.getMonth() < 10
            ? "0" + appointment.date.getMonth()
            : appointment.date.getMonth()
        }-${appointment.date.getFullYear()}`,
        time: `${
          appointment.time.getUTCHours() < 10
            ? "0" + appointment.time.getUTCHours()
            : appointment.time.getUTCHours()
        }:${
          appointment.time.getUTCMinutes() < 10
            ? "0" + appointment.time.getUTCMinutes()
            : appointment.time.getUTCMinutes()
        }`,
      }))

      res.status(200).json({
        message: "Get appointment doctor succesfully",
        data: formattedAppointments,
      })
    } catch (error) {
      return res.status(500).json({
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

      if (appointment.length == 0) {
        return res.status(404).json({
          message: "Data appointment tidak ditemukan",
        })
      }

      res.status(200).json({
        message: "Get detail appointment succesfully",
        data: appointment,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        erorr: error.message,
      })
    }
  },

  addAppointment: async (req, res) => {
    try {
      const patientId = parseInt(req.body.patient_id)
      const doctorId = parseInt(req.body.doctor_id)
      const date = req.body.date
      const time = req.body.time

      const appointment = await prisma.$queryRaw`
      INSERT INTO appointments (patient_id, doctor_id, date, time, updated_at)
      VALUES (${patientId}, ${doctorId}, STR_TO_DATE(${date}, '%d-%m-%Y'), STR_TO_DATE(${time},'%H:%i:%s'), SYSDATE())
    `

      res.status(201).json({
        message: "Add appointment succesfully",
        data: {
          patient_id: patientId,
          doctor_id: doctorId,
          date: date,
          time: time,
          status: "on going",
        },
      })
    } catch (error) {
      return res.status(500).json({
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
        return res.status(404).json({
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
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },

  getClockAppointment: async (req, res) => {
    try {
      const { doctor_id } = req.params
      const { date } = req.body

      const parsedDate = new Date(date)
      const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0))
      const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999))

      const response = await prisma.appointment.findMany({
        where: {
          AND: [
            {
              doctor_id: parseInt(doctor_id),
            },
            {
              date: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          ],
        },
      })

      if (response.length == 0) {
        return res.status(404).json({
          message: "Data appointment tidak ditemukan",
        })
      }

      const finalResponse = response.map((appointment) => ({
        time: `${
          appointment.time.getUTCHours() < 10
            ? "0" + appointment.time.getUTCHours()
            : appointment.time.getUTCHours()
        }:${
          appointment.time.getUTCMinutes() < 10
            ? "0" + appointment.time.getUTCMinutes()
            : appointment.time.getUTCMinutes()
        }`,
      }))

      res.status(200).json({
        message: "Get  appointment succesfully",
        data: finalResponse,
      })
    } catch (error) {
      return res.status(500).json({
        message: "Terjadi kesalahan error",
        error: error.message,
      })
    }
  },
}

module.exports = AppointmentController
