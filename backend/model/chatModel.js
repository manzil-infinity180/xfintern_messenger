import mongoose,{Schema} from "mongoose";

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
    content:[{
        type: Schema.Types.ObjectId,
        ref:"Message"
    }]
});

export const Chat = mongoose.model('Chat', chatSchema);

