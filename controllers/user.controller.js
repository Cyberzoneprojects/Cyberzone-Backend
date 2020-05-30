const User = require('../models/user.model')

/**
 * @function createUser for creating a new user
 * Verify if the user exist in the database else create user
 * @params (req, res)
 */
module.exports.createUser = async(req, res) =>{
    try{
        const user = await User.find({email: req.body.email})
        if(user) return res.status(404).json({status: "failed", msg: "User already exits"})

        const newUser = await User.create(req.body)
        res.status(201).json({status: "success", data: newUser})

    }catch(e){

    }
}


/**
 * @function getUsers for getting the list of users
 * @params (req, res)
 */
module.exports.getUsers = async(req, res) =>{
    try{
        const user = await User.find({})
        res.status(201).json({status: "success", data: user})

    }catch(e){

    }
}

/**
 * @function getUser for getting a single user
 * Verify if the user exist in the database 
 * if true get the user
 * @params (req, res)
 */
module.exports.getUser = async(req, res) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

        res.status(200).json({status: "success", data: user})

    }catch(e){

    }
}

/**
 * @function updateUser for updating a user
 * Verify if the user exist in the database 
 * if true updates the user
 * @params (req, res)
 */
module.exports.updateUser = async(req, res) =>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new: true})
        res.status(200).json({status: "success", data: updatedUser})

    }catch(e){

    }
}


/**
 * @function removeUser for deleting a user
 * Verify if the user exist in the database 
 * if true delete the user
 * @params (req, res)
 */
module.exports.removeUser = async(req, res) =>{
    try{
        const {id} = req.params
        const user = await User.findByIdAndRemove(id)
        if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

        res.status(200).json({status: "success", data: user})

    }catch(e){

    }
}