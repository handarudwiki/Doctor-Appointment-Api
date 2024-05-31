const { PrismaClient } = require("@prisma/client")
const { faker, fakerID_ID } = require("@faker-js/faker")

const prisma = new PrismaClient()

const main = async () => {
  const doctor = await prisma.user.findMany({
    where: { role: "doctor" },
    select: { id: true },
  })
  // console.info(doctor)
  const spesialis = [
    "umum",
    "gigi",
    "mata",
    "penyakit dalam",
    "kandungan",
    "anak",
    "jantung",
    "bedah",
  ]

  for (let i = 0; i < 20; i++) {
    await prisma.doctor.create({
      data: {
        id: doctor[i].id,
        categori: spesialis[Math.floor(Math.random() * (spesialis.length - 1))],
        description: faker.lorem.sentence(5),
        price: parseInt(
          faker.commerce.price({ min: 100000, max: 500000, dec: 0 })
        ),
        hospital_name: `RS ${fakerID_ID.location.city()}`,
        photo_profile: "https://source.unsplash.com/random/?doctor",
        experience: `${Math.floor(Math.random() * 20)} tahun`,
        created_at: new Date(),
        updated_at: new Date(),
      },
    })
  }
}

module.exports = main
