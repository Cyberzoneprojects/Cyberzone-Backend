const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    phone_number:{
        type: String,
        required: [true, 'Add your phone number'],
    },
    gender:{
        type: String,
        required: [true, 'Please select your gender'],
    },
    country:{
        type: String,
        required:[true, 'Please add your country'],
    },
    last_name:{
        type: String,
        required: [true, 'Enter your address'],
    },
    services:[String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Users', userSchema)
