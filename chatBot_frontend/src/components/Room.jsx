import {useNavigate } from 'react-router-dom';
import {socket} from '../socket.js';
export function Room() {
    const navigate = useNavigate ();
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
        navigate('/room');
    }

    return <>
        <form onSubmit={handleSubmit}>
            <input type={"text"}
                   name={"username"}
                   placeholder={"enter your username"}
            />
            <input type={"text"}
                   name={"roomId"}
                   placeholder={"enter your roomId"}
            />
            <button type={"submit"}>Join Room</button>
        </form>
    </>
}