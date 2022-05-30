
  
const router = require('express').Router()
const moduleRoute = require('./module.routes')
const unitRoute = require('./unit.routes')

module.exports = () =>{
    
    router.use('/module', moduleRoute())
    router.use('/unit', unitRoute())


    return router
}