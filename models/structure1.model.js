const mongoose = require('mongoose');

const structOneSchema = new mongoose.Schema({
    unit_id:{
        type: String,
    },
    name:{
        type: String,
        require: true
    },
    title:{
        type: String,
        require: true
    },
    video:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model('structOne', structOneSchema);