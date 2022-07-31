const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
    },
    country:{
        type: String,
    },
    status:{
        type: String,
    },
    address:{
        type: String,
    },
    resetToken:{
        type: String
    },
    services_subscribed:{
        type: {}
    },
}, {timestamps: true})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

module.exports  = mongoose.model('user', userSchema)