import mongoose, { Schema } from "mongoose";

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    }

});

const contentSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['text', 'image', 'video', 'pdf', 'location','contact'],
        required:true
    },
    text:{
        type:String
    },
    media:{
        type:String
    },
    pdf:{
        type:String
    },
    contact:{
        type:contactSchema
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    }

});
const messageSchema= new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    senderId:{
        type: String
    },
    receiver:{
        type:String,
        required:true
    },
    timestamp:{type:Date,default:Date.now},
    content:{
        type: contentSchema,
        required: true
    }
});

export const Message = mongoose.model('Message', messageSchema);