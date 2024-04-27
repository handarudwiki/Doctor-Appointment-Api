'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('ratings',{
    id : {
      type : Sequelize.INTEGER,
      primaryKey : true,
      autoIncrement : true,
      allowNull:false
    },
    doctor_id : {
      type : Sequelize.INTEGER,
      allowNull:false,
    },
    rating : {
      type : Sequelize.INTEGER,
      allowNull:false,
    },
    created_at : {
      type : Sequelize.DATE,
      allowNull:false,
    },
    updated_at : {
      type : Sequelize.DATE,
      allowNull:false,
    }
   })

   await queryInterface.addConstraint('ratings',{
    type : 'foreign key',
    name : 'RATINGS_DOCTOR_ID',
    fields : ['doctor_id'],
    references : {
      table : 'doctors',
      field : 'id'
    }
  })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('ratings')
  }
};
