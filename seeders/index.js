const doctor_seeder = require("./doctor_seeder")
const user_seeder = require("./user_seeder")
const appointment_seeder = require("./appointment_seeder")

const main = async () => {
  await user_seeder()
    .then(() => console.info("User seeder completed"))
    .catch((e) => console.error(e))
  await doctor_seeder()
    .then(() => console.info("Doctor seeder completed"))
    .catch((e) => console.error(e))
  await appointment_seeder()
    .then(() => console.info("Appointment seeder completed"))
    .catch((e) => console.error(e))
}

main()
