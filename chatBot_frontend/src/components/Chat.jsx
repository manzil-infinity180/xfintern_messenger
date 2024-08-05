import {useEffect, useState} from "react";
import {socket} from "../socket.js";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessageToDatabase } from "../redux/action/groupAction.jsx";
export function Chat({username,roomId, color}) {
    const dispatch = useDispatch();
    const [message,setMessage] = useState('');
    const [chat, setChat] = useState([]);
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData);
        data = {
            ...data,
            username,
            roomId,
            color
        }
        dispatch(addNewMessageToDatabase(data.message, roomId));
        socket.emit('client_message',data);
        socket.emit('room_message',data);
        console.log(data);
        setMessage("");

    }
    useEffect(() => {
        socket.on('room_server_message', (data) => {
            setChat((chat) => [...chat, data]);
            console.log(chat);
        });
        return () => socket.off('room_server_message');
    },[socket]);

    return <>
        <h2>Chating .....</h2>
        <form onSubmit={handleSubmit}>
            <input type={"text"} placeholder={"Chat..."}
                   style={{
                       width: "75%",
                       padding: "10px 20px",
                       margin: "10px 20px"
                   }}
                   name={"message"}
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
            />
        </form>
        <div>
            {
                chat.length > 0 && chat.map((data,index) => (
                    <div key={index}
                    style={{
                        border: "1px solid black",
                        padding: "1px 2px 3px",
                        margin:'5px 5px'
                    }}
                    >
                        <label
                            style={{
                                textDecoration:'underline',
                                color:'blue',
                                margin:'0 0 2px'
                            }}
                        >{data.username}</label>
                        <h1
                            style={{ margin:'0', padding:"0 30px", background:data.color, opacity:'0.90'}}
                        >{data.message}</h1>
                    </div>
                ))
            }

        </div>


    </>
}