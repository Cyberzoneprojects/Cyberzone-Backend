const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
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
    excercise:{
        type:String
    },
    isViewed:{
        type:Boolean
    },
    video:{
        type:String
    }
})

module.exports = mongoose.model('unit', unitSchema);