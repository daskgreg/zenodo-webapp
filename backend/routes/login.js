const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req,res) => {
    const user = await User.findOne({username:req.body.username});
    console.log(user);
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign({user:user}, process.env.secret, {expiresIn:"1h"});
        res.cookie("token", token,{httpOnly:true});
        res.status(200).send({message:"User Authenticated",user: user.username, isAdmin: user.isAdmin, token:token})
    }else{
        return res.status(403).json({error:"invalid login",message:"wrong Username or Password"});
    }
})


module.exports = router;