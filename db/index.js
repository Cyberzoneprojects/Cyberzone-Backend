
const mongoose = require('mongoose')
require('dotenv').config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE

module.exports = (app) => {
    mongoose.connect(DATABASE,
        {
            useUnifiedTopology: true
        }, (err) => {
            if (err) return console.log("Connection failed", err)

            console.log("DB Connected")
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        }
    )
}