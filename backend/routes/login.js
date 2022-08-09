const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req,res) => {
    // const user = await User.findOne({username:req.body.username});
    // const secret = process.env.SECRET;
    // if(!user) return res.status(400).send('The User not found');

    // if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    //     const token = jwt.sign(
    //         {
    //             userId: user.id,
    //             isAdmin: user.isAdmin
    //         },
    //         secret,
    //         {expiresIn : '1d'}
    //     )

    //     res.cookie("token",token,{
    //         httpOnly:true,
    //         secure:true,
    //         maxAge:100000,
    //         signed:true
    //     });
       
    //     res.status(200).send({message:"User Authenticated",user: user.username, token: token})
    // } else {
    //    res.status(400).send('password is wrong!');
    // }
    
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