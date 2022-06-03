const { handleErrorMessage } = require("./handleErrorMessage")

module.exports.validation = (schema, req, res, func)=>{
    const {error} = schema.validate(req.body)
    if(error.details){
        const errorMessage = handleErrorMessage(error.details[0])
        return res.status(400).send(errorMessage)
        
    }
    // console.log(value)
    func()
}