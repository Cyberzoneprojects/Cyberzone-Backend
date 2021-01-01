const jwt = require('jsonwebtoken')

module.exports = (id, email, secret_key, expiration_time='3d') =>{
    const token = jwt.sign({id, email}, secret_key, {expiresIn: expiration_time})
    return token
}