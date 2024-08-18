import { io } from 'socket.io-client';
// setting up url
const URL = 'http://localhost:3000';
// getting the sever using the io fro socket.io
export let socket;
export function socketConnection(){
    if(socket && socket.connected) {
        console.log("you are already connected");
        return socket;
    }else {
         socket = io(URL,{
                transports: ['websocket', 'polling', 'flashsocket'],
                withCredentials: true,
                autoConnect:'false'
        });
        return socket;
    }
}
socket = socketConnection();

// export const socket = io(URL,{
//     transports: ['websocket', 'polling', 'flashsocket'],
//     withCredentials: true,
//     autoConnect:'false'
// });

// By default, the Socket.IO client opens a connection to the server right away.
// You can prevent this behavior with the autoConnect option:
// when you need to connect with socket you need to call "socket.connect()"

