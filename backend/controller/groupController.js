import {Group} from '../model/groupModel.js';

export const createGroup = async (req, res) => {
    try{
        const alreadyGroupExist = await Group.findOne({
            "groupId": req.body.groupId,
        });
        if(alreadyGroupExist){
            throw new Error("Group with these id already existed");
        }
        const newGroup = await Group.create(req.body);
        res.status(200).json({
            status:"success",
        });

    }catch(err){
        res.status(400).json({
            status:"error",
        })
    }
}
