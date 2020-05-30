const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const connect = require('./db')

const app = express()

app.use(cors({origin: true}))
app.use(express.json())


app.use('/api/v1', routes())


// Handles 5xx errors
app.use((err, req, res, next)=>{
    res.status(500).send(err)
})

connect(app)
