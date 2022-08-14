const User = require('../models/user.model')
const Service = require('../models/service.model')
const Token = require('../models/token.model')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

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
 * @function requestResetPassword 
 * verify's if the user is in the system
 * creates a reset token then saves the hash in the database
 * @params (req, res)
 */
module.exports.requestResetPassword = async(req, res, next) =>{
     try{
        const {email} = req.body
        
        const user = await User.findOne({email})
        console.log(user)
        if (!user) throw new Error("User does not exist");

        // const token = await Token.findOne({userId: user._id})
        // if(token) await token.deleteOne()

        const resetToken = crypto.randomBytes(32).toString('hex')
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(resetToken, salt)
        await User.findByIdAndUpdate(id, {$set: {resetToken: hash}});
        
        const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
        sendEmail(user.email,"Password Reset Request",{name: user.first_name,link: link,}, "./template/requestResetPassword.handlebars");
    

    }catch(err){
        next({msg: "Oops! something went wrong couldn't request a password reset", err})
        console.log('fhd')
    }
}

/**
 * @function resetPassword 
 * verify's if the user is in the system
 * creates a new password
 * @params (req, res)
 */
module.exports.resetPassword = async(req, res, next) =>{
     try{
        const {userId, resetToken, password} = req.body
        const user = await User.findById(userId)
        if (!user) throw new Error("User does not exist");

        const isValid = await bcrypt.compare(resetToken, user.resetToken)
        if(!isValid) throw new Error("Invalid reset token");
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        await User.findByIdAndUpdate(userId, {$set:{password: hashedPassword}})

        res.status(200).json({status: "success", data: user, msg: "Password reset successfully"})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't request a password reset", err})
    }
}


module.exports.signinUser = (req, res)=>{
    const {email, password}=req.body;
    User.findOne({email}, (err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User email does not exist. Please signup"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password don't match"
            });
        }




        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

        res.cookie('tok', token, {expire: new Date()+9999})
        const {_id, name, email, role} = user
        return res.json({token, user:{_id, name, email, role}})
    })
}