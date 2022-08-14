const User = require("../models/userModel");
const Token = require("../models/token");

const sendEmail = require("../utils/utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

router.post("/", async (req, res) => {
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
  });

router.post("/:userId/:token", async (req, res, next) => {
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
  });

module.exports = router;