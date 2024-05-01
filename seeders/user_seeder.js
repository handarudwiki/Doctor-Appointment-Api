const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 10; i++) {
        await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: await bcrypt.hash("password", 10),
                role: "patient",
                no_hp: faker.phone.number(),
                created_at: new Date(),
                updated_at: new Date(),
            },
        })
    }
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
        console.info("Seeding completed!!")
    })
