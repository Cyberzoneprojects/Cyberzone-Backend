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
    units:{
        type:String
    },
    serviceID:{
        type:String
    }
})

module.exports = mongoose.model('module', moduleSchema);