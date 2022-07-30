const Joi = require('joi')
const { validation } = require('../utils/validation')

const schema = Joi.object({
    unitId: Joi.string().required(),
})

module.exports.validateCreateExercise = (req, res, next) =>{
    validation(schema, req, res, next)
}