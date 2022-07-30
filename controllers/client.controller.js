const Client = require("../models/client.model")

module.exports.signup = (req,res) =>{
    console.log("request body:",req.body)
    const client = new Client.create(req.body);
    res.status(201).json({status: "success", data: client})


    // const user = new Client(req.body)
    // user.save((err, user)=>{
    //     console.log("error is : " ,err)
    //     if(err){
    //         console.log(err)
    //         return res.status(400).json({
    //             err
    //         })
    //     }
    //     res.json({
    //         user
    //     })
    // })


    // const user = new User(req.body)
    // user.save(
    //     (user, err)=>{
    //     if(err){
    //         console.log(err)
    //         return res.status(400).json({
    //             err
    //         })
    //     }
    //     res.json({
    //         res
    //     })}
    // )
}