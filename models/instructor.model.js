const mongoose = require("mongoose")

const instructorSchema = new mongoose.Schema({
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
    phone_number:{
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    skills:{
        type: String,
    },
    educational_level:{
        type: String,
    },
    services:{
        type: [String],
    },
}, {timestamps: true})

module.exports  = mongoose.model('instructor', instructorSchema)