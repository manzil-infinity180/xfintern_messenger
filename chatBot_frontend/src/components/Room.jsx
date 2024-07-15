import {useNavigate } from 'react-router-dom';
import {socket} from '../socket.js';
import {Chat} from "./Chat.jsx";
import {useState} from "react";
export function Room() {
    const navigate = useNavigate ();
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [color, setColor] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);
        if(data.username==='' || data.roomId===''){
            alert('Username and roomId must have value');
            return;
        }
        socket.emit('join_room',data);
        // navigate('/room');
    }

    return <>
        <form onSubmit={handleSubmit}>
            <input type={"text"}
                   name={"username"}
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder={"enter your username"}
            />
            <input type={"text"}
                   name={"roomId"}
                   value={roomId}
                   onChange={(e) => setRoomId(e.target.value)}
                   placeholder={"enter your roomId"}
            />
            <input type={"text"}
                   name={"color"}
                   value={color}
                   onChange={(e) => setColor(e.target.value)}
                   placeholder={"enter your fav color"}
            />
            <button type={"submit"}>Join Room</button>
        </form>
        <Chat username={username} roomId={roomId} color={color}/>
    </>
}