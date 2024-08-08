import { socket } from '../../socket';
import toast from "react-hot-toast";
import { groupDetails, allGroupsDetails, 
         joinedGroupDetails, allGroupsMessage,
         eligibleMessage
       } from '../slice/groupSlice'
const server = 'http://localhost:3000'
export const getGroupDetails = (groupId) => async (dispatch) => {
    try{
        const url = `${server}/group/${groupId}`;
        console.log(url);
        const res = await fetch(url, {
            credentials: 'include',
          });
        

        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            console.log(error.info);
            throw error
        }
        const data = await res.json();
        dispatch(groupDetails(data.data));

    }catch(err){
        console.log(err)
    }
}

export const getAllGroupsDetails = () => async (dispatch) => {
    try{
        const url = `${server}/group/v1/all`;
        const res = await fetch(url, {
            credentials: 'include',
          });
        

        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            console.log(error.info);
            throw error
        }
        const data = await res.json();
        dispatch(allGroupsDetails(data.data));

    }catch(err){
        console.log(err)
    }
}

export const joinedGroup = (groupId, navigate, groupData) => async (dispatch) => {
    try{
        const url = `${server}/group/join/${groupId}`;
        const res = await fetch(url, {
            credentials: 'include',
          });
        

        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            console.log(error.info);
            throw error
        }
        const data = await res.json();

        dispatch(joinedGroupDetails(data.data));

        socket.emit('join_room', groupData);
        navigate(`/group/${groupId}`);

    }catch(err){
        console.log(err)
    }
}

// what we  are persisted the message in database
export const getAllGroupsMessage = (groupId) => async (dispatch) => {
    try{
        const url = `${server}/group/allmessage/${groupId}`;
        const res = await fetch(url, {
            credentials: 'include',
          });
        

        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            console.log(error.info);
            throw error
        }
        const data = await res.json();

        dispatch(allGroupsMessage(data.data));

    }catch(err){
        console.log(err)
    }
}

export const addNewMessageToDatabase = (message,groupId) => async (dispatch) => {
    try{
        const postData = {
            message: message,
            type: 'text'
        }
        const url = `${server}/group/add/message/${groupId}`;
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(postData),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
              },
          });
        

        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            throw error
        }
        const data = await res.json();
        console.log(data);

    }catch(err){
        console.log(err)
    }
}

export const editNewMessage = (groupId, messageId, message) => async (dispatch) => {
    try{
        const updatedData = {
            messageId:messageId,
            message: message,
            type: 'text'
        }
        const url = `${server}/group/update/message/${groupId}`;
        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(updatedData),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
              },
          });
        
        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            console.log(error.info);
            toast.error(error.info.err);
            throw error
        }
        const data = await res.json();
        console.log(data);
        location.reload();
        

    }catch(err){

    }
}

export const checkEligibleOwner = (groupId, messageId) => async (dispatch) => {
    try{
        const updatedData = {
            messageId:messageId,
            type: 'text'
        }
        const url = `${server}/group/check/message/${groupId}`;
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(updatedData),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
              },
          });
        
        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            throw error
        }
        const data = await res.json();
        dispatch(eligibleMessage(data.data));

    }catch(err){

    }
}

export const deleteMessages = (groupId, messageId) => async (dispatch) => {
    try{
        const updatedData = {
            messageId:messageId,
        }
        const url = `${server}/group/delete/message/${groupId}`;
        const res = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify(updatedData),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
              },
          });
        
        if(!res.ok) {
            const error = new Error('An error occurred while fetching the events');
            error.code = res.status;
            error.info = await res.json();
            toast.error(error.info.err);
            throw error
        }
        const data = await res.json();
        console.log(data);
        location.reload();
    }catch(err){

    }
}