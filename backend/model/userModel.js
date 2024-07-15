import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    providerId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    picture:{
        type:String,
    },
    provider:{
        type:String,
        required:true
    },
});

export const User = mongoose.model('User', userSchema);

