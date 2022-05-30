
  
const router = require('express').Router()
const moduleRoute = require('./module.routes')
const exerciseRoutes = require('./unit.routes')

module.exports = () =>{
    
    router.use('/module', moduleRoute())
    router.use('/unit', exerciseRoutes())


    return router
}