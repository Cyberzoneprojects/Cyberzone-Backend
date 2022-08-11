const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    amount:{
        type: String,
        required: true
    },
    subscribe:{
        type: String,
    },
    resource:{
        type: [String],
    },
    modules:{
        type: [Object],
    }
}, {timestamps: true})

module.exports  = mongoose.model('service', serviceSchema)