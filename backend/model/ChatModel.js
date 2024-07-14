import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    },
    message:{type:String,required:true},
    timestamp:{type:Date,default:Date.now},

});

const chatSchema= new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    },
    message:[messageSchema]
});

const Chat = mongoose.model('Chat', chatSchema);

