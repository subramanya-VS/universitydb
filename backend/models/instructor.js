import mongoose from 'mongoose';
const instructorSchema = new mongoose.Schema({
    instructorId: {
        type: Number, 
        required: true,
        },
    FName: {
        type: String,
        required: true,
    },
    LName: {
        type: String,
        required: true,
    },
    dept_name: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    ph_no:{
        type: Number,
        required: true,
    },
    email: {
        type: String,
    }   
});

export default mongoose.model('Instructor', instructorSchema);
export { instructorSchema };