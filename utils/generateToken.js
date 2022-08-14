const jwt = require('jsonwebtoken')

module.exports = (id, email, secret_key='dfkjlfeiufeoipergnsjhdiewrgnjkvoshgs', expiration_time='180s') =>{
    const token = jwt.sign({id, email}, 'dfkjlfeiufeoipergnsjhdiewrgnjkvoshgs', {expiresIn: expiration_time})
    return token
}