
const mongoose = require('mongoose')
require('dotenv').config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE

<<<<<<< HEAD
module.exports = (app) => {
    mongoose.connect(DATABASE,
        {
            useUnifiedTopology: true
        }, (err) => {
            if (err) return console.log("Connection failed", err)
=======
module.exports = (app) =>{
    mongoose.connect(DATABASE,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        }, (err)=>{
                if(err) return console.log("Connection failed", err)
>>>>>>> upstream/main

            console.log("DB Connected")
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        }
    )
}