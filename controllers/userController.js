const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Token = require("../models/token");

const sendEmail = require("../utils/utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");

// @desc    Register new user
// @route   POST /api/v1/users
const registerUser = asyncHandler(async (req, res) => {
  const { first_name, email, password, phone_number, gender, country, last_name, services } = req.body

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
      isAdmin: user.isAdmin
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


const updateUser = async (req, res, next) => {
  console.log('update')
  try {
    const { id } = req.params
    const user = await User.findById(id)
    // req.body = JSON.parse(req.body)
    // console.log(req.body, id)
    if (!user) { return res.status(404).json({ status: "failed", msg: "User not found" }) }

    const updatedService = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.status(200).json({ status: "success", data: updatedService })
  }
  catch (err) {
    next({ msg: "Oops! something went wrong couldn't update service for the user", err })
  }
}


/**
 * @function getUsers for getting the list of users
 * @params (req, res)
 */
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find({}).select("-password")
    res.status(201).json({ status: "success", data: user })

  } catch (err) {
    next({ msg: "Oops! something went wrong couldn't get users", err })
  }
}

/**
 * @function getAmin for getting the list of users
 * @params (req, res)
 */
const getAdmin = async (req, res, next) => {
  try {
    const user = await User.find({ isAdmin: true }).select("-password")
    res.status(201).json({ status: "success", data: user })
    console.log(res.data)
  } catch (err) {
    next({ msg: "Oops! something went wrong couldn't get users", err })
  }
}


// /**
//  * @function setNewPassword reseting password using old and new passwor
//  * @params (req, res)
//  */
//  const setNewPassword = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.body.old-password)
//   } catch (err) {
//     next({ msg: "Oops! something went wrong couldn't get users", err })
//   }
// }



/**
 * 
 * @function  removeUser  Deleting user from the system
 * @param {userId} 
 * @returns 
 */

const removeUser = async(req, res, next) =>{
  try{
      const {id} = req.params
      const user = await User.findByIdAndRemove(id)
      if(!user) return res.status(404).json({status: "failed", msg: "User not found"})

      res.status(200).json({status: "success", data: user, msg: "User deleted succesfully"})

  }catch(err){
      next({msg: "Oops! something went wrong couldn't remove user", err})
  }
}

// var nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  console.log(user)
  // if (user) {
  //   var transporter = nodemailer.createTransport({
  //     service: 'hotmail',
  //     auth: {
  //       user: 'fvenyuy@outlook.com',
  //       pass: 'fev3@!fev3'
  //     }
  //   });

  //   var mailOptions = {
  //     from: 'fvenyuy@outlook.com',
  //     to: { email },
  //     subject: 'Sending Email using Node.js',
  //     text: 'That was easy!  https://localhost:3000'
  //   };

  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //       return (error)
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //       return (info.response)
  //     }
  //   });
  // }else{
  //   console.log('Email does not exist')
  // }

}


/*
*   @function resetMail request reset email.
*  Send email to user with reset link
*  Reset link contains id and token
*
 */

const resetMail = async (req, res) => {
  try {
      const schema = Joi.object({ email: Joi.string().email().required() });
      const { error } = schema.validate(req.body);

      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findOne({ email: req.body.email });
      if (!user)
          return res.status(400).send("user with given email doesn't exist");

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
          token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }

      const link = `http://localhost:3000/password-reset/${user._id}/${token.token}`;
      await sendEmail(user.email, "Password reset", link);

      res.send("password reset link sent to your email account");
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
}

/*
*   @function resetUserPassword request reset user password.
*   @params id, reset token
*
 */


const resetUserPassword = asyncHandler(async (req, res, next) => {
  console.log('hello reset function')
  console.log(req.params)
  console.log(req.body)
  try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) { 
        res.status(400)
        throw new Error('Invalid credentials'); }

      const user = await User.findById(req.params.userId);
      // console.log(user)
      if (!user) {
          
    res.status(400)
    throw new Error('Invalid credentials of link expired')
      }

      const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
      });
      if (!token) { 
        res.status(400)
        throw new Error('Invalid link or expired') }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      user.password = hashedPassword;
      await user.save();
      await token.delete();

      res.send("password reset sucessfully.");
  } catch (error) {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60m',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getUsers,
  getAdmin,
  sendMail,
  resetMail,
  resetUserPassword,
  removeUser,
}
