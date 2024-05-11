const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    const Rating = sequelize.define('Rating',{
        id :{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        doctor_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        rating : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        createdAt : {
            type : DataTypes.DATE,
            allowNull : false,
            field : 'created_at'
        },
        updatedAt : {
            type : DataTypes.DATE,
            allowNull : false,
            field : 'updated_at'
        }
    },
    {
        sequelize,
        tableName : 'ratings',
        timestamps : true
    }

);

    return Rating;
}