const Joi = require('joi')
const { handleErrorMessage } = require('../utils/handleErrorMessage')

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

module.exports.userValidation = (req, res, next)=>{
    const {error} = registrationSchema.validate(req.body)
    if(error.details){
        const errorMessage = handleErrorMessage(error.details[0])
        console.log(errorMessage)
        return res.status(400).send(errorMessage)
        
    }
    // console.log(value)
    next()
}