import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import connectDB from './utils/connectDB.js';   
import dashBoardRouter from './routes/dashboardRoutes.js';
import { registerRouter } from './routes/registerRouter.js';
dotenv.config();
const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`http://localhost:${[process.env.PORT]}`)
    connectDB(); // Connect to MongoDB
    
});

app.use('/auth', authRouter);
app.use('/dashboard',dashBoardRouter)
app.use('/profile',registerRouter)