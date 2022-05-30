const mongoose = require('mongoose')

const attestationSchema = new mongoose.Schema({
    modules: [String],
    progress: String,
    average_score: String
}, {timestamps: true})


module.exports = mongoose.model('attestation', attestationSchema)