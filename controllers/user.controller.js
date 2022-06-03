const User = require('../models/user.model')
const Service = require('../models/service.model')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

require('dotenv').config()

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
        const user = await User.find({}).select("-password")
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
        const user = await User.findById(id).select("-password")
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
 * if true subscribe to a service
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

/**
 * @function login to a service
 * Verify if the user exist in the database 
 * Verify password
 * if true 
 * @params (req, res)
 */
module.exports.login = async(req, res, next) =>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user) return res.status(404).json({status: "failed", msg: "User not found invalid email"})
       
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword) return res.status(404).json({status: "failed", msg: "Invalid password"})
        
        const accessToken = generateToken(user._id, email, process.env.SECRET_KEY)
        const refreshToken = generateToken(user._id, email, process.env.REFRESH_KEY, '7d')
        
        const newUser = await User.findByIdAndUpdate(user._id, {$set:{refreshToken}}, {new: true})
        
        res.status(200).json({status: "success", data: {...newUser._doc, accessToken, refreshToken}, msg: "Login succesfull"})


    }catch(err){
        next({msg: "Oops! something went wrong couldn't login user", err})
    }
}