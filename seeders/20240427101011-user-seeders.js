'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',[
      {
        name : "Surata",
        email : "surata@gmail.com.com",
        password : await bcrypt.hash("password", 10),
        role : "pasien",
        no_hp : "0821212121212",
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        name : "nata",
        email : "nata@gmail.com.com",
        password : await bcrypt.hash("password", 10),
        role : "pasien",
        no_hp : "0821212121212",
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        name : "Handaru",
        email : "handaru@gmail.com.com",
        password : await bcrypt.hash("password", 10),
        role : "docto",
        no_hp : "0821212121212",
        created_at : new Date(),
        updated_at : new Date()
      },
      {
        name : "Rosinda",
        email : "inda@gmail.com.com",
        password : await bcrypt.hash("password", 10),
        role : "doctor",
        no_hp : "0821212121212",
        created_at : new Date(),
        updated_at : new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
