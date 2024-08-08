import {Group} from '../model/groupModel.js';
import {User} from "../model/userModel.js";
import {Message} from "../model/messageModel.js";

export const createGroup = async (req, res) => {
    try{
        const alreadyGroupExist = await Group.findOne({
            "groupId": req.body.groupId,
        });
        if(alreadyGroupExist){
            throw new Error("Group with these id already existed");
        }
        const schema = {
            ...req.body,
            creator: req.user,
            members: [req.user]
        }
        const newGroup = await Group.create(schema);

        const user = await User.findById(req.user);
        user.groupOwner.push(newGroup._id);
        user.joinedGroup.push(newGroup._id);
        await user.save();

        res.status(200).json({
            status:"success",
            data:newGroup
        });

    }catch(err){
        res.status(400).json({
            status:"error",
            err:err.message
        })
    }
}

export const getGroup = async (req, res) => {
    try{
        const groups = await Group.findOne({
            "groupId": req.params.groupId
        }, {strictPopulate: false}).populate("members").populate('content');


        // const groups = await Group.aggregate([{
        //     $match:{groupId : req.params.groupId}
        // },
        //     {
        //           $lookup:{
        //             from:'User',
        //             localField:'uuid',
        //             foreignField:'userid',
        //             as:'allpost'
        //           }
        //         },
        // ]);

        if(!groups){
            throw new Error("No groups available with these groupId");
        }

        res.status(200).json({
            status:"success",
            data: groups
        });

    }catch(err){
        res.status(400).json({
            status:"failed",
            err:err.message
        })
    }
}

export const joinedGroup = async (req, res) => {
    try{
        const loginedUser = await User.findById(req.user);
        if(!loginedUser){
            throw new Error("you are not logined");
        }
        const groupId = req.params.groupId;
        const isGroupExisted = await Group.findOne({
            "groupId": groupId
        });
        if(!isGroupExisted){
            throw new Error("Group with these id not existed");
        }

        // console.log("loginedUser");
        // console.log(loginedUser);
        // console.log("----- is group existed------");
        // console.log(isGroupExisted);
        // we need to check it
        // is you are already a member of this group
        // is you are owner of this group

        console.log(loginedUser.joinedGroup.length);
        function checkMember() {
            let value = false;
            loginedUser.joinedGroup.forEach((user) => {
                 if(user.toString() === isGroupExisted._id.toString()){
                    value = true;
                 }
        })
        return value;
        }
        const isMember = loginedUser.joinedGroup.length !==0 ? checkMember() : false;
        console.log(isMember);

        if((isGroupExisted.creator.equals(loginedUser._id)|| isMember)){
            return res.status(200).json({
                status:"success",
                data: `Joined ${isGroupExisted.name}`
            });
        }


        isGroupExisted.members.push(loginedUser._id);
        await isGroupExisted.save();

        loginedUser.joinedGroup.push(isGroupExisted._id);
        await loginedUser.save();

        res.status(200).json({
            status:"success",
            data:`You are now member of ${isGroupExisted.name}`
        });

    }catch(err){
        res.status(400).json({
            status:"failed",
            err:err.message
        })
    }
}

export const getAllGroups = async (req, res) => {
    try{
        console.log("hello");
        const groups = await Group.find().populate('creator').populate('members');
        console.log(groups);
        if(!groups){
            throw new Error("No groups available , refresh it!");
        }

        res.status(200).json({
            status:"success",
            data: groups
        });

    }catch(err){
        res.status(400).json({
            status:"failed",
            err:err.message
        })
    }
}

export const addNewMessage = async (req, res) => {
    try{
        const group = await Group.findOne({
            'groupId': req.params.groupId
        });
        const loginedUser = await User.findById(req.user);

        if(!group){
            throw new Error("Something went wrong");
        }

        // implemented only just for text type messages 

        const content = {
            type: req.body.type,
            text: req.body.message
        }

        const data =  {
            sender: loginedUser.name,
            senderId: loginedUser._id,
            receiver: req.params.groupId,
            content
        }

        const message = await Message.create(data);
        console.log(message);

        res.status(200).json({
            status:'success',
            message:message
        });

    }catch(err){
        res.status(400).json({
            status:'failed',
            err: err.message
        });

    }
}

export const updateMessage =  async (req, res) => {
    try{
        const group = await Group.findOne({
            'groupId': req.params.groupId
        });

        if(!group){
            throw new Error("Something went wrong");
        }
        console.log(req.body.messageId);
        const loginedUser = await User.findById(req.user);
        const message = await Message.findById({_id: req.body.messageId}); // messageId is nothing but _id
        console.log(message);
        if(loginedUser._id.toString() !== message.senderId.toString()){
            throw new Error("You can't change other message");
        }

        if(message.content.type !== 'text'){
            throw new Error("You can only change text type message");
        }

        if(!(req.body.message.length > 0) ){
            throw new Error('Message should not be empty');
        }

        // only you can update text type message
        if(message.content.type !== 'text')  {
            throw new Error('You can only edit the message');
        }

        const updatedMessage =  {
            type: message.content.type,
            text: req.body.message
        }

        const update = await Message.findByIdAndUpdate(req.body.messageId,{
            content: updatedMessage
        });

        res.status(200).json({
            status:'success',
            data:'Your message is Updated'
        });

    }catch(err){
        res.status(400).json({
            status:'failed',
            err:err.message
        });
    }
}

export const deleteContent =  async (req, res) => {
    try{
        const group = await Group.findOne({
            'groupId': req.params.groupId
        });

        if(!group){
            throw new Error("Something went wrong");
        }

        const loginedUser = await User.findById(req.user);
        const message = await Message.findById(req.body.messageId); // messageId is nothing but _id

        function checkOwner(){
            let value = false;
            loginedUser.groupOwner.forEach((id) => {
                if(id.toString() === group.creator.toString()){
                    value = true;
                }
            });
            return value;
        }

        const isOwner = (loginedUser.groupOwner.length !==0) && checkOwner;

        console.log(isOwner);

        if(loginedUser._id.toString() !== message.senderId.toString() || !isOwner){
            throw new Error("You can't delete other message");
        }

        await Message.deleteOne({_id: req.body.messageId});

        res.status(200).json({
            status:'success',
            data:'Your message is Deleted'
        });

    }catch(err){
        res.status(400).json({
            status:'failed',
            err:err.message
        });
    }
}

export const getAllContent = async (req, res) => {
    try{
        const allMessage = await Message.find({
            'receiver': req.params.groupId
        });

        res.status(200).json({
            status:'success',
            data: allMessage
        })
    }catch(err){
        res.status(400).json({
            status:'failed',
            err: err.message
        });

    }
}

export const checkMessageOwner =  async (req, res) => {
    try{
        const group = await Group.findOne({
            'groupId': req.params.groupId
        });

        if(!group){
            throw new Error("Something went wrong");
        }

        const loginedUser = await User.findById(req.user);
        const message = await Message.findById(req.body.messageId); // messageId is nothing but _id

        if(loginedUser._id.toString() !== message.senderId.toString()){
            throw new Error("You can't change other message");
        }

        if(message.content.type !== 'text'){
            throw new Error("You can only change text type message");
        }

        res.status(200).json({
            status:'success',
            data:'You are Eligible to Edit and Delete'
        });

    }catch(err){
        res.status(400).json({
            status:'failed',
            err:err.message
        });
    }
}