const Joi = require('joi')
const { validation } = require('../utils/validation')


// Schemas
const registrationSchema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.ref('password'),
    gender: Joi.string(),
    country: Joi.string(),
    status: Joi.string(),
    address: Joi.string(),
})
const tokenSchema = Joi.object({
    email: Joi.string().email().required(),
    refreshToken: Joi.string().required(),
})




// validation middlewares

module.exports.userValidation = (req, res, next)=>{
    validation(registrationSchema, req, res, next)
}


module.exports.validateToken = (req, res, next)=>{
    validation(tokenSchema, req, res, next)
}