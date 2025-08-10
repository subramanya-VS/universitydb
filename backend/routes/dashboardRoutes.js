import express from 'express';
import { getStudentDashboardData, getInstructorDashboardData } from '../Controller/dashboardController.js';
import cors from 'cors';
import { protect } from '../middleware/authMiddleware.js';

const dashBoardRouter = express.Router();
dashBoardRouter.use(express.json({ limit: '50mb' }));
dashBoardRouter.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true   
}))

dashBoardRouter.get('/student',protect, getStudentDashboardData);
dashBoardRouter.get('/instructor',protect, getInstructorDashboardData);
export default dashBoardRouter;
