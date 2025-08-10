import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    studentId: {
        type: String,
        required: true,
    },
    Fname: {
        type: String,
        required: true,
    },
    Lname: {
        type: String,
        required: true,
    },
    sem:{
        type: Number,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    section:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Student', studentSchema);
export { studentSchema };

