import {QueryClient} from "@tanstack/react-query"
export const queryClient = new QueryClient();
const server = 'http://localhost:3000';

// eligible function for  checking is this message is editable or not
export async function editAndDeleteMsg(postData){
    //groupId, messageId
        const updatedData = {
            messageId:postData.messageId,
            type: 'text'
        }
        const url = `${server}/group/check/message/${postData.groupId}`;
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
        const {data} = await res.json();
        return data;
}

export async function deleteEligibleMessage(postData) {
        const updatedData = {
            messageId:postData.messageId,
        }
        const url = `${server}/group/delete/message/${postData.groupId}`;
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
        const {data} = await res.json();
        return data;
}

export async function editEligibleMessage(postData){
        const updatedData = {
            messageId:postData.messageId,
            message: postData.message,
            type: 'text'
        }
        const url = `${server}/group/update/message/${postData.groupId}`;
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
        const {data} = await res.json();
        return data;
}
