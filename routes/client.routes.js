const express = require("express")
const router = express.Router();


const {signup} = require("../controllers/client.controller");
module.exports = ()=>{
    router.post("/signup", signup)
    return router
}
