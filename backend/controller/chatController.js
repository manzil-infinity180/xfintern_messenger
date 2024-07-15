import {Chat} from '../model/chatModel.js';

export const savedChatMessage = async (req,res) => {
    try{
        const findRoomId = await Chat.findOne({"roomId":req.body.roomId});
        const newChat = {
            sender: req.body.sender,
            receiver: req.body.receiver,
            message:req.body.current_message,
        }
        console.log(findRoomId);
        if(findRoomId){
            findRoomId.message.push(newChat);
            findRoomId.save();

            res.status(200).json({
                status:"success",
                data:findRoomId
            });
        }else{
            console.log(req.body);
            const chat = await Chat.create(req.body);
            chat.message.push(newChat);
            chat.save();

            res.status(200).json({
                status:"success",
                data:chat
            });
        }



    }catch(err){
        console.log(err);
        res.status(400).json({
            status:"error",
            err:err
        });

    }

}
export const getChatMessage = async (req,res) => {
    try{
        const getChat = await Chat.findOne({roomId:req.params.roomId});
        if(!getChat){
            throw new Error("Wrong room id");
        }
        res.status(200).json({
            status:"success",
            data:getChat
        })

    }catch(err){
        res.status(400).json({
            status:"error",
            err:err.message
        })
    }
}