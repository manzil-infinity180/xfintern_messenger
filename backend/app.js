import express from 'express';
export const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import {Server} from 'socket.io';
import {createServer} from 'http';
import {router as chatRoute} from "./router/chatRoute.js";

export const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173/',
        credentials: true
    }
});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5173/"],
    // origin: ["http://localhost:5173"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials:true
}));
app.use('/', chatRoute);

app.get('/', (req,res) => {
   req.send('Hello world');
});

io.on('connection', (socket) => {
    console.log('Yeah i am connected to socket' + socket.id );
    // console.log(socket);
    socket.on('disconnect_me',() => {
        console.log('byee disconnecting.....');
        socket.disconnect();
    });

    socket.emit('welcome', {
        data:'hello ji aur baatoo'
    });

    // joining rooms
    socket.on('join_room', (data) => {
        console.log(data);
        const roomId = data.roomId;
        socket.join(roomId);
        socket.to(roomId).emit('room_message',`Username: ${data.username} has been joined the room`);
        socket.on('room_message', (data) => {
            console.log(data);
            io.to(roomId).emit('room_server_message',data);
        });
    });

});
