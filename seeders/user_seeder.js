const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

const main = async () => {
  const gender = ["pria", "wanita"]

  for (let i = 0; i < 50; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("password", 10),
        role: i % 2 === 0 ? "doctor" : "patient",
        no_hp: faker.phone.number(),
        created_at: new Date(),
        updated_at: new Date(),
        age: 20,
        gender: gender[i % 2],
      },
    })
  }
}

module.exports = main
