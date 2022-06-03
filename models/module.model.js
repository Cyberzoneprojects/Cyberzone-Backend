const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    title:{
        type: String,
    },
    image:{
        type:String,
    },
    time_spent:{
        type: String
    },
    serviceID:{
        type:String
    }
}, {timestamps: true})

module.exports = mongoose.model('module', moduleSchema);