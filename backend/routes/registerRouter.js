import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { registerInstructor, registerStudent } from '../Controller/registerController.js';
import { protect } from '../middleware/authMiddleware.js';

dotenv.config()
export const registerRouter = express.Router();
registerRouter.use(express.json({ limit: '50mb' }))
registerRouter.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

registerRouter.post('/student',protect,registerStudent)
registerRouter.post('/instructor',protect,registerInstructor)