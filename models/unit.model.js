const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    module_id:{
        type: String,
    },
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
    excercises:[String],
    isViewed:{
        type:Boolean
    },
    video:{
        type:String
    }
})

module.exports = mongoose.model('unit', unitSchema);