import Student from '../models/student.js';
import Instructor from '../models/instructor.js';

export const registerStudent = async (req,res,next) =>{
    try{const {Fname, Lname, studentId, sem, program, section} = req.body;
    const existingStudent = await Student.findOne({studentId});
    if(existingStudent){
        return res.status(400).json({
            success: false,
            message: "student already exists"
        })
    }
    const student = new Student({
        user: req.user.id,Fname, Lname, studentId, sem, program, section
    })
    await student.save()
    res.status(200).json({
        success: true,
        message: "student registered successfully"
    })}
    catch (err){
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
        console.log(err)
    }
}

export const registerInstructor = async (req,res,next) =>{
    try{
        const {instructorId,Fname,Lname,dept_name,salary,ph_no,email} = req.body;
    existingInstructor = await Instructor.findOne({instructorId})
    if(existingInstructor){
        return res.status(200).json({
            success: false,
            message: "Instructor already exists"
        })
    }
    const instructor = new Instructor({
        instructorId,
        Fname,
        Lname,
        dept_name,
        salary,
        ph_no,
        email
    })
    await instructor.save()
    res.status(200).json({
        success: true,
        message: "instructor registered successfully"
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}