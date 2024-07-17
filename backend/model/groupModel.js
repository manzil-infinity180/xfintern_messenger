import mongoose, {Schema} from "mongoose";

const messageSchema= new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    message:{type:String, required:true},
    timestamp:{type:Date,default:Date.now},
});

const groupSchema= new mongoose.Schema({
    name:{type:String,required:true},
    creator:{type:Schema.Types.ObjectId, ref:"User", required:true},
    members:[{type:Schema.Types.ObjectId, ref:"User"},],
    groupId:{
        type:String,
        required:true,
        unique:true
    },
    message:[messageSchema],
});

export const Group = mongoose.model('Group', groupSchema);

