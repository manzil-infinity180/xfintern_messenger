import mongoose, {Schema} from "mongoose";

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
    joinedGroup:[{
        type:Schema.Types.ObjectId,
        ref:"Group"
    },],
    groupOwner:[{
        type:Schema.Types.ObjectId,
        ref:"Group"
    }]
});

export const User = mongoose.model('User', userSchema);

