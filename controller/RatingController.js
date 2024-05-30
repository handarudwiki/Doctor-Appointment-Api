const { where } = require("sequelize");
const { Rating } = require("../models");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const Validator = require('fastest-validator');

const validator = new Validator();

const createRating = async (req, res) => {
    try {
        const schema = {
            rating: { type: 'number', positive: true, integer: true, min: 1, max: 5 },
            doctor_id: { type: 'number', positive: true, integer: true },
        };

        const check = validator.compile(schema);
        const validationResult = check(req.body);
        
        if (validationResult !== true) {
            return res.status(400).json({
                status: 'error',
                message: validationResult,
            });
        }

        const { doctor_id, rating } = req.body;

        const savedRating = await Rating.create({
            doctor_id: doctor_id,
            rating: rating,
            user_id: req.user,
        });

        return res.status(200).json({
            status: 'success',
            data: savedRating,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};


const getRating = async (req, res)=>{
    try {
        const ratings = await Rating.findAll({
            where : {
                doctor_id: req.params.doctorId
            }
        })

        let rating = 0
        for (let i=0; i<ratings.length; i++){
            rating += ratings[i].rating
        }

        rating = rating/ratings.length

        return res.status(200).json({
            status : 'success',
            data : rating
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const getAllRating = async (req, res) =>{
    try {
        const doctorId = parseInt(req.params.doctorId)

        // return res.json(doctorId)
        const ratings = await prisma.rating.findMany({
            where: {
                doctor_id : doctorId
            },
            include:{
                user:true,
                doctor:true
            }
        })

        return res.status(200).json({
            status : 'success',
            data : ratings
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

module.exports = {
    createRating,
    getRating,
    getAllRating
}