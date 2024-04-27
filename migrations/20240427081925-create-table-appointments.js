'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('appointments',{
    id : {
      type : Sequelize.INTEGER,
      primaryKey : true,
      autoIncrement : true,
      allowNull : false,
    },
    user_id : {
      type : Sequelize.INTEGER,
      allowNull : false,
    },
    doctor_id : { 
      type : Sequelize.INTEGER,
      allowNull : false,
    },
    Date : {
      type : Sequelize.DATE,
      allowNull : false,
    },
    created_at : {
      type : Sequelize.DATE,
      allowNull : false,
    },
    updated_at : {
      type : Sequelize.DATE,
      allowNull : false,
    }
   })

   await queryInterface.addConstraint('appointments',{
    type : 'foreign key',
    name : "APPOINTMENTS_USER_ID",
    fields : ['user_id'],
    references : {
      table : 'users',
      field : 'id'
    }
   })

   await queryInterface.addConstraint('appointments',{
    type : 'foreign key',
    name : 'APPOINTMENTS_DOCTOR_ID',
    fields : ['doctor_id'],
    references : {
      table : 'doctors',
      field : 'id'
    }
  })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('appointments');
     
  }
};
