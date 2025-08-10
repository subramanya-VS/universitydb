import Student from '../models/student.js';
import Instructor from '../models/instructor.js';

export const getStudentDashboardData = async(req,res,next) =>{
    console.log('🔍 getStudentDashboardData req.user:', req.user);
    try {
            const dashboardData = await Student.findOne({ user: req.user.id }).select('-__v -createdAt -updatedAt');;
            if(!dashboardData){
                return res.status(404).json({message: 'Student data not found'});
            }
            return res.status(200).json({
                success: true,
                data: dashboardData
            })
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error)
    }
}

export const getInstructorDashboardData = async(req,res,next) =>{
    try{
        const {username,role} = req.user;
        const dashboardData = await Instructor.findOne({ username });
        if(!dashboardData){
            return res.status(404).json({message: 'Instructor data not found'});
        }
        return res.ststus(200).json({
            success: true,
            data: dashboardData
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
