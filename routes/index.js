
const router = require('express').Router()
const moduleRoute = require('./module.routes')
const unitRoute = require('./unit.routes')
const serviceRoute = require('./service.routes')
const instructorRoute = require('./instructor.routes')
const userRoutes = require('./user.routes')
const exerciseRoutes = require('./exercise.routes')
const answerRoutes = require('./answers.routes')

module.exports = () =>{

    router.use('/module', moduleRoute())
    router.use('/unit', unitRoute())

    router.use('/service', serviceRoute())
    router.use('/instructor', instructorRoute())

    router.use('/user', userRoutes())
    router.use('/exercise', exerciseRoutes())
    router.use('/answer', answerRoutes())
    return router
}