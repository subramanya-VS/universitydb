import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {authUser, registerUser} from '../Controller/authController.js';
import { refreshAccessToken } from '../utils/tokenGenerator.js';
import { protect } from '../middleware/authMiddleware.js';
dotenv.config();
const authRouter = express.Router();
// cors: cross origin resource sharing
//cors: cross origin resource sharing
authRouter.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


authRouter.use(express.json({limit: '50mb'}));


// Test route
authRouter.get('/test', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Test route is working!'
    });
});


authRouter.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Auth API!'
    });
});


authRouter.post('/register',registerUser);
authRouter.post('/login',authUser);
authRouter.post('/refresh', refreshAccessToken);
export default authRouter;