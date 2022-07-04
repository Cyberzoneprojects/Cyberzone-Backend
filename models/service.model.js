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
    modules:{
        type: [String],
        required: true
    },
    isComplete:{
        type: String,
    },
    isBlocked:{
        type: String,
    },
    subscribers:{
        type: String,
    },
    attestation:{
        type: String,
    },
    resource:{
        type: [String]
    },
}, {timestamps: true})

module.exports  = mongoose.model('service', serviceSchema)