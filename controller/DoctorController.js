const { where } = require('sequelize');
const {User,Doctor} = require('../models')

const getAllDoctor = async(req,res)=>{
    try {
        let doctors
        if(req.query.category){
             doctors = await Doctor.findAll(
                {
                    where : {category : req.query.category},
                    include :[
                        {
                            model : User,
                            as : 'user'
                        }
                    ]
                }
            );
        }else{
             doctors = await Doctor.findAll(
                {
                    include :[
                        {
                            model : User,
                            as : 'user'
                        }
                    ]
                }
            );
        }
        
         return res.status(200).json({
            status : 'success',
            data : doctors
         })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const getDoctorById = async(req, res) => {
    try {
        const doctor = await Doctor.findOne({
            where: {id : req.params.id},
            include :[
                {
                    model : User,
                    as : 'user'
                }
            ]
        })

        if(!doctor){
            return res.status(404).json({
                status : 'error',
                message : 'doctor not found'
            })
        }

        return res.status(200).json({
            status : 'success',
            data : doctor
        })
    } catch (error) {
        
    }
}

module.exports = {
    getAllDoctor,
    getDoctorById
}