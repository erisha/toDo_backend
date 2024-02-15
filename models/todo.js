import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        ref: "User",
        required: true
    },
    

}, {timestamps: true});

export default mongoose.model('Todo', todoSchema);