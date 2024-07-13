import {useEffect, useState} from 'react'
import { socket } from './socket.js'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState("");

    function handleSocketConnection(){
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.connect();
        socket.on('welcome',(data) => {
            console.log(data);
        })
        // alert("hello you are connected");
        console.log(socket.connected);
        setIsConnected(true);
    }
    useEffect(()=>{
          socket.connect();
    },[]);
    function handleDisconnection(){
        socket.on('disconnect');
        console.log(socket.connected);
        setIsConnected(false);
    }
    function handleSubmitMessage(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);
        socket.emit('client_send_msg', {
            client_message: data.me
        });
        e.react.reset();
    }

  return (
      <>
          <h1>{isConnected ? 'Yeah we are connected to socket hahhha' : 'Fuck dude , i am not connected'}</h1>
          <button onClick={handleSocketConnection}>Click me to Connect</button>
          <button onClick={handleDisconnection}>Click me to Disconnected</button>
          <br />
          <form onSubmit={handleSubmitMessage}>
          <input type={"text"} placeholder={"Typing..."}
                 style={{padding:"10px 20px", width:"50%",margin:"0 5px", fontSize:"1.25rem"}}
                 value={message}
                 name={"message_input"}
                 onChange={(e) => setMessage(e.target.value)}
          />
          <button type={"submit"}>Message Me</button>
          </form>
      </>
  )
}

export default App
