
const router = require('express').Router()
const moduleRoute = require('./module.routes')
const unitRoute = require('./unit.routes')
const serviceRoute = require('./service.routes')
const instructorRoute = require('./instructor.routes')
const userRoutes = require('./user.routes')
const exerciseRoutes = require('./exercise.routes')
const struct1Routes = require('./structure1.routes')
// const clientRoutes = require('./client.routes')

module.exports = () =>{
    
    router.use('/module', moduleRoute())
    router.use('/unit', unitRoute())

    router.use('/service', serviceRoute())
    router.use('/instructor', instructorRoute())
    
    router.use('/user', userRoutes())
    router.use('/exercise', exerciseRoutes())
    router.use('/', struct1Routes())
    // router.use('/client', clientRoutes())
    return router
}