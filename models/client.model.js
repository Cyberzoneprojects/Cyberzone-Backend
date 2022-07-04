const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const uuidv1 = require('uuid');

const clientSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: "Enter your first name"
    },
    last_name:{
        type: String,
        required: "Enter your last name"
    },
    email: {
        type: String,
        required: "Pls enter your email",
        unique: true
    },
    phone_number:{
        type: String,
    },
    hashed_password:{
        type: String,
    },
    gender:{
        type: String,
    },
    country:{
        type: String,
    },
    status:{
        type: String,
    },
    address:{
        type: String,
    },
    // resetToken:{
    //     type: String
    // },
    services_subscribed:{
        type: Array,
        default: []
    },
    salt: String,
    role:{
        type: Number,
        default: 0
    }

}, {timestamps: true});

//  Vitual fields

clientSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

clientSchema.methods = {
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return "";
        }
    }
}

// userSchema.pre('save', async function(next){
//     const salt = await bcrypt.genSalt(10)

//     const hashedPassword = await bcrypt.hash(this.password, salt)
//     this.password = hashedPassword 
//     next()
// })

module.exports  = mongoose.model('people', clientSchema)