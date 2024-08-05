import mongoose, {Schema} from "mongoose";

const groupSchema= new mongoose.Schema({
    name:{type:String,required:true},
    creator:{type:Schema.Types.ObjectId, ref:"User", required:true},
    members:[{type:Schema.Types.ObjectId, ref:"User"},],
    groupId:{
        type:String,
        required:true,
        unique:true
    },
    content:[{
        type:Schema.Types.ObjectId,
        ref:"Message"
    }],
});

export const Group = mongoose.model('Group', groupSchema);

