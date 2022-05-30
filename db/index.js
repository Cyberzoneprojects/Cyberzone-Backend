const mongoose = require('mongoose')
const {PORT, MONGO_URL} = require('../config/default')

module.exports = (app) =>{
    mongoose.connect(MONGO_URL, 
        {
            useUnifiedTopology: true
        }, (err)=>{
                if(err) return console.log("Connection failed", err)

                console.log("DB Connected")
                app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
    })
}