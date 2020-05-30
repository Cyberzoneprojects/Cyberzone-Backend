const router = require('express').Router()
const userRoutes = require('./user.routes')
const exerciseRoutes = require('./exercise.routes')

module.exports = () =>{
    
    router.use('/user', userRoutes())
    router.use('/exercise', exerciseRoutes())


    return router
}