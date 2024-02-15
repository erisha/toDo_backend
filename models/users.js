import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({

username: {
    type: String,
    minLength: 5,
    maxLength: 20
},
email: {
    type: String,
    required: true,
    unique: true,
},
password: {
    type: String,
    minLength: 8,
    required: true
},
admin: {
    type: Boolean,
    default: false
},

}, {
timestamps: true,
toJSON: {
    transform: function(doc, retDoc) {
        delete retDoc.password;//removes password from the json doc
        return retDoc;
    }
}
});

userSchema.index({email: 1});
userSchema.index({username: 1});


userSchema.pre('save', async function(next) {
// if the password has not change continue
if (!this.isModified("password")) return next();

this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
return next();
});




export default mongoose.model('User', userSchema);