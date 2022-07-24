const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    answer:{
        type: [String],
        required: true
    },
    correct_answer:{
        type: [String],
        required: true
    },
    unit_id:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('answer', answerSchema);