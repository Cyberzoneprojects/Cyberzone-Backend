const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    answer:{
        type: [String],
        required: true
    },
    mark: {
        type: String,
        required: true
    },
    isAnswered: {
        type: Boolean
    }
}, {timeseries: true})


module.exports = mongoose.model('exercise', exerciseSchema)