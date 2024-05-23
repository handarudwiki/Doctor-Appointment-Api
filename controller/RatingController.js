const { where } = require("sequelize");
const { Rating } = require("../models");
const validator = require('fastest-validator')
const v = new validator()

const createRating = async (req, res)=>{
    try {
        const schema = {
            rating : 'number|empty:false',
            doctor_id : 'number|empty:false',
        }

        const validated =  v.validate(req.body, schema)

        if(validated.length){
            return res.status(400).json({
                status : 'error',
                message : validated
            })
        }

        const {doctor_id, rating} = req.body;

        console.log(doctor_id)
        console.log("1")
        const savedRating = await Rating.create({
            doctor_id:doctor_id,
            rating: rating,
            user_id : req.user
        })

        return res.status(200).json({
            status : 'success',
            data : savedRating
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

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

module.exports = {
    createRating,
    getRating
}