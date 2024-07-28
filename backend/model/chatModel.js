import mongoose from "mongoose";

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

