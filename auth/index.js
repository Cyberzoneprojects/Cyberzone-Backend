const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = async (req, res, next) =>{
    if(!req.headers || !req.headers.authorization || !req.headers.authorization.includes('Bearer ')){
        return res.status(401).json("Unauthorise")
    }

    const token = req.headers.authorization.split(' ')[1]

    const user = jwt.verify(token, process.env.SECRET_KEY)

    const userData = await User.findById(user.id)
    if(!userData) return res.status(404).json({status: "failed", msg: "Unauthorise user not found"})

    req.user = user

    next()
}