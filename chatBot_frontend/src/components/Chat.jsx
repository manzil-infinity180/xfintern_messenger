import { useEffect, useState } from "react";
import { socket } from "../socket.js";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessageToDatabase, checkEligibleOwner } from "../redux/action/groupAction.jsx";
export function Chat({ username, roomId, color }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [changed, setChanged] = useState(false);
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
        socket.emit('client_message', data);
        socket.emit('room_message', data);
        console.log(data);
        setMessage("");
        // var objDiv = document.getElementById("hello_message");
        // objDiv.scrollTop = objDiv.scrollHeight;

    }
    function formateDate() {
        const data = Date.now();
        console.log(data);
        let date = new Date(data);
        console.log(date);
        // date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        return date;
    }
    // function handleScroll(){
    //     const fuck_rahul = document.getElementById('content_div_ele');
    //     window.scrollTo(0, fuck_rahul.scrollHeight);
    //     console.log(fuck_rahul.scrollHeight);
        
    // }
    // const date = formateDate().toString;
    useEffect(() => {
        socket.emit('join_room', {roomId, username});
    },[]);
    useEffect(() => {
        socket.on('room_server_message', (data) => {
            setChat((x) => [...x, data]);
            console.log(chat);
        });
        console.log(chat);
        return () => socket.off('room_server_message');
    }, [socket]);
    return <>
        <div id="hello_message">
            {
                chat.length > 0 && chat.map((data, index) => (
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
                        <h3
                            style={{ margin:'0', padding:"0 30px", opacity:'0.90'
                            }}
                        >{data.message}</h3>
                        <p>{formateDate().toString()}</p>
                    </div>
                ))
            }

        </div>
        <div style={{
            display:'grid'
        }}>
        <form onSubmit={handleSubmit}>
            <input type={"text"} placeholder={"Chat..."}
                style={{
                    width: "75%",
                    padding: "10px 20px",
                    margin: "10px 20px",
                }}
                name={"message"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}

            />
            <button
            style={{
                padding:'10px 25px',
            }}
            type="submit"
            >Send</button>
        </form>
        </div>

    </>
}