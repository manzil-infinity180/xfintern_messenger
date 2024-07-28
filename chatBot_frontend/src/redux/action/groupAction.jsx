import { socket } from '../../socket';
import { groupDetails, allGroupsDetails, joinedGroupDetails, allGroupsMessage } from '../slice/groupSlice'
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
            console.log(error.info);
            throw error
        }
        const data = await res.json();
        console.log(data);

    }catch(err){
        console.log(err)
    }
}