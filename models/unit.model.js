const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    module_id:{
        type: String,
    },
    title:{
        type: String,
        require: true
    },
    image:{
        type:String,
        require: true
    },
    time_spent:{
        type: String,
    },
    score:{
        type: String,
    },
    isViewed:{
        type:Boolean,
    },
    video:{
        type:String,
    },
    number_of_question:{
        type:String,
    },
    questions_time:{
        type:String,
    },
    time:{
        type:String,
    },
    unit_home_content:{
        type:[Object],
    },
    unit_content:{
        type:[Object],
    }
},{timestamps:true})

module.exports = mongoose.model('unit', unitSchema);