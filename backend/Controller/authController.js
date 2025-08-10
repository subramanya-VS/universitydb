import User from '../models/user.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerator.js';

dotenv.config();

export const authUser = async (req,res,next)=>{
    try{
        const {username, password} = req.body;
        const userDetails = await User.findOne({username});
        if(!userDetails){
            return res.status(404).json({message: 'User not found try registering first'});
        }
        const isPasswordValid = await bcrypt.compare(password, userDetails.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid password'});
        }
        if(userDetails &&  isPasswordValid){
            const refreshToken = await generateRefreshToken(userDetails._id);
            res.status(200).cookie('refreshToken',refreshToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: parseInt(process.env.REFRESH_TOKEN_TTL)
            }).json({
                success: true,
                message: 'User authenticated successfully',
                user: {
                    id: userDetails._id,
                    username: userDetails.username,
                    role: userDetails.role
                },
                token: generateAccessToken(userDetails._id,userDetails.role)
            });}
    }

    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const registerUser =  async (req,res,next) =>{
    try{
        const {username, password, role} = req.body;
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role
            },
            token: generateAccessToken(newUser._id, newUser.role)
        });
    }
    catch(err){
        res.status(500).json({success: false, message:"Server error plis try again later"});
        console.log(err)
    }
}
