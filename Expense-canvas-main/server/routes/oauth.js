const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const User = require("../models/userModels");
const useNavigate = require('react-router-dom');
// const navigate = useNavigate();
//handling the request from google
dotenv.config();
const { OAuth2Client, auth } = require('google-auth-library');
const generateToken = require('../config/generateToken');
var emailUser;
router.get('/', async function (req, res, next) {
  const code = req.query.code;
  try {
    const redirectURL = "http://localhost:5000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    const user = oAuth2Client.credentials;

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`);
    const userData = await response.json();
    console.log("userDAta",userData);
    // console.log(userData.name);
    emailUser = userData.email;
    const newUser = new User({
       name: userData.name,
       email: userData.email,
       pic: userData.picture,
       password: 'NotRequired!39&'
    });

    const authUser = await User.findOne({email:userData.email});
    // const savedUser = await newUser.save();
    console.log("auth user", authUser)
    
    const data = {
      _id:authUser._id,
      name:authUser.name,
      email:authUser.email,
      isAdmin:authUser.isAdmin,
      pic:authUser.pic,
      token:generateToken(authUser._id),
    }
    console.log("data",data)
    res.cookie("_id",authUser._id)
    res.cookie("name",authUser.name)
    res.cookie("email",authUser.email)
    res.cookie("isAdmin",authUser.isAdmin)
    res.cookie("pic",authUser.pic)
    res.cookie("token", generateToken(authUser._id),{secure:true})
    // console.log('User saved to MongoDB:', savedUser);
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
  }
  
  res.redirect('http://localhost:3000/mainpage');

});


module.exports = router;
