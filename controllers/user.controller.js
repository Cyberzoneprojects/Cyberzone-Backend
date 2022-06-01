const User = require('../models/user.model')
const Service = require('../models/service.model')

/**
 * @function createUser for creating a new user
 * Verify if the user exist in the database else create user
 * @params (req, res)
 */
module.exports.createUser = async(req, res, next) =>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(user) return res.status(404).json({status: "failed", msg: "User already exits", user})
        
        const newUser = await User.create(req.body)
        res.status(201).json({status: "success", data: newUser})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't create user", err})
    }
}


/**
 * @function getUsers for getting the list of users
 * @params (req, res)
 */
module.exports.getUsers = async(req, res, next) =>{
    try{
        const user = await User.find({})
        res.status(201).json({status: "success", data: user})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get users", err})
    }
}

/**
 * @function getUser for getting a single user
 * Verify if the user exist in the database 
 * if true get the user
 * @params (req, res)
 */
module.exports.getUser = async(req, res, next) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

        res.status(200).json({status: "success", data: user})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't get user", err})
    }
}

/**
 * @function updateUser for updating a user
 * Verify if the user exist in the database 
 * if true updates the user
 * @params (req, res)
 */
module.exports.updateUser = async(req, res, next) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedUser})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't update user", err})
    }
}


/**
 * @function removeUser for deleting a user
 * Verify if the user exist in the database 
 * if true delete the user
 * @params (req, res)
 */
module.exports.removeUser = async(req, res, next) =>{
    try{
        const {id} = req.params
        const user = await User.findByIdAndRemove(id)
        if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

        res.status(200).json({status: "success", data: user, msg: "User deleted succesfully"})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't remove user", err})
    }
}

/**
 * @function subscride to a service
 * Verify if the user exist in the database 
 * if true delete the user
 * @params (req, res)
 */
module.exports.subscribe = async(req, res, next) =>{
    try{
        const {id} = req.user
        const {serviceId} = req.body

        const user = await User.findByIdAndRemove(id)
        const service = await Service.findById(serviceId)
        if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

        await User.findByIdAndUpdate(id, {$addToSet: {services_subscribed: service._id}}, {new: true})
        await Service.findByIdAndUpdate(id, {$addToSet: {subscribers: user._id}}, {new: true})

        res.status(200).json({status: "success", data: user, msg: "Subscription succesfull"})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't subscribe to service", err})
    }
}
