const mongoose = require('mongoose')
const config = require('../config/default')

module.exports = (app) =>{
    mongoose.connect(config.MONGO_URL, {useUnifiedTopology: true}, (err)=>{
        if(err) return console.log("Could not connect to database")
        
        console.log("DB Connected")
        app.listen(config.PORT, ()=>console.log(`Server running on port ${config.PORT}`))
    })
}