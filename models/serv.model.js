const mongoose = require("mongoose")

const servSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    services:[{
        score:{
            type: String,
        },
        modules:[{
            module_time_spent:{
                type: String,
            },
            module_score:{
                type: String,
            },
            units:{
                time_spent:{
                    type: String,
                },
                score:{
                    type: String,
                }
            }
        }]
    }]
}, {timestamps: true})

module.exports  = mongoose.model('serv', servSchema)