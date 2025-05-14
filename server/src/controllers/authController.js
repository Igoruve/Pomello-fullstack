import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const login = async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({error:"Invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({error:"Invalid credentials"});
    }
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.json({token});
}

const register = async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return res.status(400).json({error:"Email already in use"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new userModel({email,password:hashedPassword});
    await newUser.save();
    res.json({message:"User created"});
}

export default {login,register};