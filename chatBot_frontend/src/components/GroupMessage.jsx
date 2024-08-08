import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMessages, editNewMessage, joinedGroup } from "../redux/action/groupAction";

export function GroupMessage({data}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [editData,setEditData] = useState("");
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
        dispatch(deleteMessages(data.receiver,data._id));
        console.log(data);
    }
    function handleUpdateMessage(e) {
        e.preventDefault();
        dispatch(editNewMessage(data.receiver, data._id, editData));
        setEdit(false);
    }
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
             <button onClick={handleEditButton} style={{
                cursor:'pointer'
             }}>Edit</button>
             <button onClick={handleDeleteButton} style={{
                cursor:'pointer'}}
                >Delete</button>
             {
                edit && <>
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