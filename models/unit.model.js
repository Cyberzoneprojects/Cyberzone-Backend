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
        type: String,
    },
    excercises:[String],
    isViewed:{
        type:Boolean,
    },
    video:{
        type:String,
    },
    number_of_question:{
        type: String,
    },
    time:{
        type: String,
    },
    unit_content:{
        type: [Object],
        blackbox: true
    }

})

module.exports = mongoose.model('unit', unitSchema);