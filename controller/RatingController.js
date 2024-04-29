const { where } = require("sequelize");
const { Rating } = require("../models");

const createRating = async (req, res)=>{
    try {
        const {doctor_id, rating} = req.body;

        const savedRating = await Rating.create({
            doctor_id:doctor_id,
            rating: rating
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