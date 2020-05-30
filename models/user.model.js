const mongoose = require("mongoose")

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
    status:{
        type: String,
    },
    address:{
        type: String,
    },
    services_subscribed:{
        type: [String]
    },
}, {timestamps: true})