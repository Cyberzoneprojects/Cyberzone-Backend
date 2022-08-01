const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/v1/users
const registerUser = asyncHandler(async (req, res) => {
  const { first_name, email, password,phone_number, gender, country, last_name, services } = req.body

  if (!first_name || !email || !password || !phone_number || !gender || !country || !last_name) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    first_name,
    email,
    password: hashedPassword,
    phone_number,
    gender,
    country,
    last_name,
    services,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      first_name: user.first_name,
      email: user.email,
      token: generateToken(user._id),
      phone_number: user.phone_number,
      gender: user.gender,
      country: user.country,
      last_name: user.last_name,
      services: user.services
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/v1/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      first_name: user.first_name,
      email: user.email,
      token: generateToken(user._id),
      phone_number: user.phone_number,
      gender: user.gender,
      country: user.country,
      last_name: user.last_name,
      services: user.services,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


const updateUser = async(req, res, next) =>{
  console.log('update')
  try{
      const {id} = req.params
      const user = await User.findById(id)
      // req.body = JSON.parse(req.body)
      // console.log(req.body, id)
      if(!user) {return res.status(404).json({status: "failed", msg: "User not found"})}

     else{ const updatedService = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      res.status(200).json({status: "success", data: updatedService})
    console.log(updatedService)}
  }catch(err){
      next({msg: "Oops! something went wrong couldn't update service for the user", err})
  }
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
}
