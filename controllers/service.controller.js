const Service = require('../models/service.model')

/**
 * @function createService for creating a new service
 * Verify if the service exist in the database else create service
 * @params (req, res)
 */
module.exports.createService = async(req, res, next) =>{
    try{
        const service = await Service.findOne({name: req.body.name})
        if(service) return res.status(404).json({status: "failed", msg: "Service already exits", service})
        
        const newService = await Service.create(req.body)
        res.status(201).json({status: "success", data: newService})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't create service", err})
    }
}


/**
 * @function getServices for getting the list of services
 * @params (req, res)
 */
module.exports.getServices = async(req, res, next) =>{
    try{
        const service = await Service.find({})
        res.status(201).json({status: "success", data: service})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get services", err})
    }
}

/**
 * @function getService for getting a single service
 * Verify if the service exist in the database 
 * if true get the service
 * @params (req, res)
 */
module.exports.getService = async(req, res, next) =>{
    try{
        const {id} = req.params
        const service = await Service.findById(id)
        if(!service) return res.status(404).json({status: "failed", msg: "Service not found"})

        res.status(200).json({status: "success", data: Service})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get service", err})
    }
}

/**
 * @function updateService for updating a service
 * Verify if the service exist in the database 
 * if true updates the service
 * @params (req, res)
 */
module.exports.updateService = async(req, res, next) =>{
    try{
        const {id} = req.params
        const service = await Service.findById(id)
        if(!service) return res.status(404).json({status: "failed", msg: "Service not found"})

        const updatedService = await Service.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedService})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't update service", err})
    }
}


/**
 * @function removeService for deleting a service
 * Verify if the service exist in the database 
 * if true delete the service
 * @params (req, res)
 */
module.exports.removeService = async(req, res, next) =>{
    try{
        const {id} = req.params
        const service = await Service.findByIdAndRemove(id)
        if(!service) return res.status(404).json({status: "failed", msg: "Service not found"})

        res.status(200).json({status: "success", data: service, msg: "Service deleted succesfully"})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't remove service", err})
    }
}