const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const User = require("../models/userModels");
dotenv.config();
const {OAuth2Client} = require('google-auth-library');

//get users listing 
router.post('/', async function(req,res,next){
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy","no-referrer-when-downgrade");
  const redirectURL = 'http://localhost:5000/oauth';
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
      redirectURL
    );
    //refresh token sent always
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile  openid ' ],
      prompt: 'consent'
    });

    res.json({url:authorizeUrl})
});



module.exports = router;