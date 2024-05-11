// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//   await queryInterface.createTable('doctors',{
//     id :{
//       type : Sequelize.INTEGER,
//       primaryKey : true,
//       allowNull : false,
//       autoIncrement : true,
//     },
//     category : {
//       type : Sequelize.STRING,
//       allowNull : false,
//     },
//     description : {
//       type : Sequelize.TEXT,
//       allowNull : false,
//     },
//     price : {
//       type : Sequelize.INTEGER,
//       allowNull : false,
//     },
//     hospital_name : {
//       type : Sequelize.STRING,
//       allowNull : false,
//     },
//     photo_profile : {
//       type : Sequelize.STRING,
//       allowNull : false,
//     },
//     experience : {
//       type : Sequelize.STRING,
//       allowNull : false,
//     },
//     user_id : {
//       type : Sequelize.INTEGER,
//       allowNull : false,
//     },
//     created_at : {
//       type : Sequelize.DATE,
//       allowNull : false,
//     },
//     updated_at : {
//       type : Sequelize.DATE,
//       allowNull : false,
//     }
//    })

//    await queryInterface.addConstraint('doctors',{
//     type : 'foreign key',
//     name : "DOCTORS_USER_ID",
//     fields : ['user_id'],
//     references:{
//       table : 'users',
//       field : 'id'
//     }
//    })
//   },

//   async down (queryInterface, Sequelize) {
//    await queryInterface.dropTable('doctors')
//   }
// };
