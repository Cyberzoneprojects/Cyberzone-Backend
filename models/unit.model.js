const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
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
        require: true
    },
    isViewed:{
        type:Boolean,
    },
    video:{
        type:String,
        require:true
    },
    moduleID:{
        type:String,
        require: true
    }
},{timestamps:true})

module.exports = mongoose.model('unit', unitSchema);