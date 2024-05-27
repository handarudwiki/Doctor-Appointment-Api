const bcrypt = require('bcrypt');
const {User} = require('../models');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const Joi = require('joi')
const validator = require('fastest-validator');
const user = require('../models/user');
const v = new validator()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()



const register = async (req, res) => {
    try {
        const schema = {
            email : 'email|empty:false',
            password : 'string|empty:false',
            name : 'string|empty:false',
            no_hp : 'string|empty:false',
            gender : 'string|empty:false',
            age : 'number|empty:false'
        }

        const validated = v.validate(req.body, schema)

        if(validated.length){
            return res.status(400).json({
                status : 'error',
                message : validated
            })
        }

        const user = await User.findOne({
            where : {email : req.body.email}
        })

        if(user){
            return res.status(401).json({
                status : 'error',
                message : 'user already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const savedUser = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            no_hp : req.body.no_hp,
            gender : req.body.gender,
            age : req.body.age,
        })

        return res.status(200).json({
          status : 'success',
          data: {
            name : savedUser.name,
            email : savedUser.email,
            no_hp : savedUser.no_h,
            gender : savedUser.gender,
            age : savedUser.age,
            role : savedUser.role
          }
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const login = async(req, res) => {
    try {
        const schema = {
            email : 'email|empty:false',
            password : 'string|empty:false',
        }

        const validated = v.validate(req.body, schema)

        if(validated.length){
            return res.status(400).json({
                status : 'error',
                message : validated
            })
        }

        const user = await User.findOne({
            where : {email : req.body.email}
        })

        if(!user){
            return res.status(401).json({
                status : 'error',
                message : 'username or password is incorrect'
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                status : 'error',
                message : 'username or password is incorrect'
            })
        }

        const token = jwt.sign({id: user.id},'passwordKey')

        return res.status(200).json({
            token : token
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const update = async(req, res) => {
    try {
        const id = req.user
        const user = await User.findByPk(id)

        if(!user){
            return res.status(404).json({
                status : 'error',
                message : 'User not found'
            })
        }

        const schema = {
            name : 'string|empty:false',
            email : 'email|empty:false',
            no_hp :'string|empty:false'
        }
        
        const validated = v.validate(req.body, schema)

        if(validated.length){
            return res.status(400).json({
                status : 'error',
                message : validated
            })
        }

        const email = req.body.email
        if(email){
            const checkEmail = User.findOne({
                where : {email : email}
            })

            if(checkEmail && email !== user.email){
                return res.status(409).json({
                    satus : 'error',
                    message : 'Email already exists'
                })
            }
        }

        const updatedUser = await user.update({
            email : req.body.email,
            password : req.body.password,
            no_hp : req.body.no_hp,
            name : req.body.name
        })

        return res.status(200).json({
            status : 'success',
            data: {
                id : updatedUser.id,
                email : updatedUser.email,
                no_hp : updatedUser.no_hp,
                name : updatedUser.name
            }
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const detailUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user)
        if (!user) {
            return res.status(404).json({
                status : 'error',
                message : 'User not found'
            })
        }

        return res.status(200).json({
            status : 'success',
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
}

const updatePassword=  async (req, res)=>{
    try {
        const user = await User.findByPk(req.user)
        if (!user) {
            return res.status(404).json({
                status : 'error',
                message : 'User not found'
            })
        }

        console.log(user)
        console.log(req.body.password)
        hashedPassword = await bcrypt.hash(req.body.password,10)
        await user.update({
            password : hashedPassword,
        })
        console.log(user)
        return res.status(200).json({
            status : 'success',
            message : "updated password successfully" 
        })
    } catch (error) {
        return res.status(500).json({
            status : "error",
            message : error.message
        })
    }
}

module.exports = {register, login, update, detailUser, updatePassword}