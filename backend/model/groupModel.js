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

// you can delete the content from here , ig we do not used it anywhere ( first test it then push  the code)