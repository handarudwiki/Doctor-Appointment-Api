const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")

const prisma = new PrismaClient()

const main = async () => {
    const doctor = await prisma.doctor.findMany({ select: { id: true } })
    const patient = await prisma.user.findMany({ where: { role: "patient" }, select: { id: true } })

    for (let i = 0; i < 10; i++) {
        await prisma.appointment.create({
            data: {
                date: new Date(),
                time: new Date(),
                patient_id: patient[i].id,
                doctor_id: doctor[i].id,
                status: "ongoing",
                created_at: new Date(),
                updated_at: new Date(),
            },
        })
    }
}

module.exports = main