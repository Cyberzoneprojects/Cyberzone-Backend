const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const connect = require('./db')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoString = process.env.DATABASE;

require('dotenv').config();

const mongoose = require('mongoose');




mongoose.connect(mongoString)
const database = mongoose.connection;
database.on('error',(error)=>{
    console.log(error)
})
database.once('connected',()=>{
    console.log("db connecteddd")
})
// mongoose.connect(process.env.DATABASE, {
//     // useNewUrlParser: true,
//     // useCreateIndex: true,
// }).then(()=> console.log('DBase connected'))


const app = express()
app.use(express.json())
// app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())
// const test = bodyParser.urlencoded({extended:true});
// console.log(test)

app.post('/hello', (req, res)=>{
    console.log("fonchu")
    const body = req.body;
    console.log(body)
    // res.json(data)
})

// app.use(express.urlencoded({ extended: false }));

// Using morgan middlewares
app.use(morgan('dev'))
// app.use(bodyParser.json())
// console.log(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}));
            // app.use(cookieParser())
            // // var bodyParser = require('body-parser');

            // // configure the app to use bodyParser()
            // app.use(bodyParser.urlencoded({
            //     extended: true
            // }));
            // app.use(bodyParser.json());



// const cors=require("cors");

app.use('/api/v1', routes())

// app.use(routes())

// const {signup} = require("./controllers/client.controller");
// app.post("/", urlencoded, signup)

// Handles 5xx errors
app.use((err, req, res, next)=>{
    res.status(500).json({err: err.message})
})

// connect(app)
const port = process.env.PORT||8000

app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})
