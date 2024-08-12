import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient, all_Group_Messages, deleteEligibleMessage, editAndDeleteMsg, editEligibleMessage } from '../utils/http';
import { checkEligibleOwner, deleteMessages, editNewMessage, joinedGroup } from "../redux/action/groupAction";
import { eligibleMessage } from "../redux/slice/groupSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function GroupMessage({data}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {groupId} = useParams();
    const [edit, setEdit] = useState(false);
    const [editData,setEditData] = useState("");
    const [check, setCheck] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [eligible, setEligible] = useState(false);
    // react query for edit and delete eligibility 
    const {mutate} = useMutation({
        mutationFn: editAndDeleteMsg,
        onSuccess: (x) => {
            console.log('// success //' + data.sender);
            console.log(x);
            queryClient.invalidateQueries({
                queryKey: ['groupMessage', groupId]
            });
            setEligible(true);
        },
        onError: (err) => {
            console.log(err.info);
              toast.error(err.info.err);
        }
    });
    // delete the message
    const {mutate: deleteMutate} = useMutation({
        mutationFn: deleteEligibleMessage,
        onSuccess: (x) => {
            console.log(x);
            toast.success(x);
            queryClient.invalidateQueries({
                queryKey: ['groupMessage', groupId]
            });
        },
    });
    // edit the message
    const {mutate: editMutate} = useMutation({
        mutationFn: editEligibleMessage,
        onSuccess: (x) => {
            console.log(x);
            toast.success(x);
            queryClient.invalidateQueries({
                queryKey: ['groupMessage', groupId]
            });
        },
    });

     function formateDate(data) {
        let date = new Date(data);
        // date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        return date;
    }
    function handleEditButton() {
        setEditData(data.content.text);
        setEdit(true);
        console.log(editData);
    }
    function handleDeleteButton() {
        console.log(data.receiver, data._id);
        // dispatch(deleteMessages(data.receiver,data._id));
        const postData = {
            groupId: data.receiver,
            messageId: data._id
        }
        deleteMutate(postData);
        // refetch();
        console.log(data);
    }
    function handleUpdateMessage(e) {
        e.preventDefault();
        // dispatch(editNewMessage(data.receiver, data._id, editData));
        const postData = {
            messageId: data._id,
            groupId: data.receiver,
            message: editData
        }
        editMutate(postData);
        setIsVisible(false);
        // refetch();
        setEdit(false);
    }
    const selector =  useSelector(s => s.group);
    console.log(selector);
    // ----> NEW 

    function handleEditAndDelete(){
        setIsVisible(true);
        console.log(data);
        const postData = {
            messageId: data._id,
            groupId: data.receiver
        }
        // checkEligiblity(postData);
        mutate(postData);
    }


    // useEffect(() => {
    //     const postData = {
    //         messageId: data._id,
    //         groupId : data.receiver
    //     }
    //     mutate(postData);
    // },[isVisible]);

    function checkEligiblity() {
        dispatch(checkEligibleOwner(data.receiver, data._id));
        console.log(selector);
        if(selector.eligible && !check) {
            setCheck(true);
            dispatch(eligibleMessage(false));
        }
        console.log(selector);
    }
    // useEffect(() => {
    //     checkEligiblity();
    // }, [check]);
    const date = formateDate(data.timestamp).toString();
    return (
        <div
        style={{
            border: "1px solid black",
            padding: "1px 2px 3px",
            margin:'5px 5px'
        }}
        >
             <div
             style={{
                float:'right',
                padding:'10px 20px'
             }}
             >
                <p style={{
                    margin:'0',
                    fontWeight:'660',
                    cursor:'pointer'
                }}
                onClick={handleEditAndDelete}
                >. . .</p>
             {(eligible && data && isVisible) && <><button onClick={handleEditButton} style={{
                cursor:'pointer'
             }}>Edit</button>
             <button onClick={handleDeleteButton} style={{
                cursor:'pointer'}}
                >Delete</button>
                </>
                }
            
             {
                (edit && isVisible) && <>
                <form onSubmit={handleUpdateMessage}>
                <input type="text" value={editData} onChange={(e) => setEditData(e.target.value)}/>
                <button type="submit" style={{
                    cursor:'pointer'
                }}>Update me</button>
                </form>
                </>
             }
             </div>
            <label
                style={{
                    textDecoration:'underline',
                    color:'blue',
                    margin:'0 0 2px'
                }}
            >{data.sender}</label>
            <h3
                style={{ margin:'0', padding:"0 30px", background:data.color, opacity:'0.90'}}
            >{data.content.text}</h3>
             <p>{date}</p>    
        </div>
    );
}