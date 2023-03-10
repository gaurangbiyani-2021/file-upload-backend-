const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY
const signup = async (req,res) =>{

    const {username,email,password} = req.body;

    try{

        const existingUser = await userModel.findOne({email:email});
        console.log(existingUser);
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,8);

        const result = await new userModel({
            email:email,
            password:hashedPassword,
            username:username
        });
        result.save();
        console.log("hooray new user created",result);
        const token = jwt.sign({email:result.email , id:result._id} , SECRET_KEY);
        return  res.status(201).json({user:result , token:token});
        
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

const signin = async (req,res) =>{
    
    const {email,password} = req.body;

    try{
        const existingUser = await userModel.findOne({email:email});

        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

const signout = async (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out!-' });
  };

module.exports = {signup,signin , signout}