const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");

router.get(`/list`,cookieJwtAuth,async (req,res)=>{
    // const userList = await User.find().select('-passwordHash');
    const userList = await User.find()
    if(!userList){
        res.status(404).json({success:false})
    }
    res.send(userList);
})

router.get(`/user/:id`, async (req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');

    if(!user){
        res.status(404).json({message:"User not found, please try again"});
    }
    res.send(userList);
})

router.post('/register', async (req,res)=>{
    let user = new User({
        username:req.body.username,
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        passwordHash:bcrypt.hashSync(req.body.password, 10),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        isAccepted:false,
        occupation:req.body.occupation,
        company:req.body.company
    })

    user = await user.save();

    if(!user) return res.status(400).send('The user is already created');

    res.send(user);
})

router.put('/update/user/:id', async (req,res)=>{

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }
    const user = await User.findByIdAndUpdate(
    req.params.id,
    {
        username:req.body.username,
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        passwordHash:newPassword,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        isAccepted:false,
        occupation:req.body.occupation,
        company:req.body.company
    },
    {new: true}).select('-passwordHash -isAdmin -isAccepted');

    if(!user) return res.status(400).send('The user is already created');

    res.send(user);
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({username:req.body.username});
    const secret = process.env.SECRET;
    if(!user) return res.status(400).send('The User not found');
    console.log(user);
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )

        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            maxAge:100000,
            signed:true
        });
        console.log("---------------------",user);
        res.status(200).send({message:"User Authenticated",user: user.username, isAdmin: user.isAdmin, token: token})
    } else {
       res.status(400).send('password is wrong!');
    }
})

module.exports = router;