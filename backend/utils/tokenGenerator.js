import refreshToken from '../models/token.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const generateAccessToken = (id,role) =>{
    return jwt.sign({id,role}, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_TTL
    });
}

export const generateRefreshToken = async (id) =>{
    const refreshTokenString = crypto.randomBytes(64).toString('hex');
    await refreshToken.create({
        token: refreshTokenString,
        userId: id,
        expiresAt: new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_TTL))
    })
    return refreshTokenString;
}

export const refreshAccessToken = async (req,res) => {
    token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).end();
    }
    try{
        const stored = await refreshToken.findOne({token})
        if (!stored || stored.expiresAt < new Date()) {
            return res.status(403).end();
        }
        const newAccessToken = generateAccessToken(stored.userId, stored.role);
        return res.status(200).json({
            accessToken: newAccessToken
        });
    }
    catch(error){
        return res.status(403).json({message: 'Invalid refresh token'});
    }   
}