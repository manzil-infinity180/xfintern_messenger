import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    message:{type:String, required:true},
    timestamp:{type:Date,default:Date.now},
});

const chatSchema= new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    roomId:{
        type:String,
        required:true
    },
    message:[messageSchema]
});

export const Chat = mongoose.model('Chat', chatSchema);

