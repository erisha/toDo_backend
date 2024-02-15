import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    

}, {timestamps: true});

export default mongoose.model('Profile', profileSchema);