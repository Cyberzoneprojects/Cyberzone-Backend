const router = require('express').Router()
const userRoutes = require('./user.routes')

module.exports = () =>{
    
    router.use('/user', userRoutes())


    return router
}