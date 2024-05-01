const doctor_seeder = require("./doctor_seeder");
const user_seeder = require("./user_seeder");

const main = () => {
    user_seeder().then(() => console.info("User seeder completed")).catch((e) => console.error(e));
    doctor_seeder().then(() => console.info("Doctor seeder completed")).catch((e) => console.error(e))
}

main()