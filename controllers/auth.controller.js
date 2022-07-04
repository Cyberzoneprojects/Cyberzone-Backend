const User = require('../models/user.model')
const Token = require('../models/token.model')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

/**
 * @function login 
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
        
        await Token.create({userId: user._id, token: refreshToken})
        
        res.status(200).json({status: "success", data: {...user, accessToken, refreshToken}, msg: "Login succesfull"})


    }catch(err){
        next({msg: "Oops! something went wrong couldn't login user", err})
    }
}



/**
 * @function token, this function requests for a new token
 * Verify if the user exist in the database 
 * Verify refresh token
 * if true creates new access token
 * @params (req, res)
 */
module.exports.token = async(req, res, next) =>{
    try{
        const {email, refreshToken} = req.body

        const user = await User.findOne({email})
        if(!user) return res.status(404).json({status: "failed", msg: "User not found invalid email"})

        const tokenObj = await Token.findOne({token: refreshToken})
        if(!tokenObj) return res.status(404).json({status: "failed", msg: "Invalid refresh token"})

        // if(tokenObj.token != refreshToken) return res.status(404).json({status: "failed", msg: "Invalid refresh token"})
        
        const accessToken = generateToken(user._id, email, process.env.SECRET_KEY)
        
        res.status(200).json({status: "success", data: {accessToken}})

    }catch(err){
        next({msg: "Oops! something went wrong couldn't login user", err})
    }
}