import { config } from 'dotenv';
config({path: './.env'});
import express from 'express';
export const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import session from 'express-session';
import {Server} from 'socket.io';
import {createServer} from 'http';
import {router as chatRoute} from "./router/chatRoute.js";
import {router as authRoute} from "./router/authRoute.js";
import {router as groupRoute} from "./router/groupRoute.js";
import passport from 'passport'

export const server = createServer(app);

app.use(cors({
    origin: ["http://localhost:5173"],
    // origin: ["http://localhost:5173"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials:true
}));
const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"], 
        credentials: true
    }
});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(process.env.SESSION_SECRET);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.authenticate('session'));

app.use('/auth', authRoute);
app.use('/', chatRoute);
app.use('/group', groupRoute);
app.get('/', (req,res) => {
   res.send('Hello world');
});

let users = {};
let rooms = {};

io.on('connection', (socket) => {
    console.log('Yeah i am connected to socket : ' + socket.id );
    // console.log(socket);
    socket.on("disconnect", (params) => {
        Object.keys(rooms).map(roomId => {
          rooms[roomId].users = rooms[roomId].users.filter(x => x !== socket.id)
        })
        delete users[socket.id];
      });

    socket.emit('welcome', {
        data:'hello ji aur baatoo'
    });

    // joining rooms
    socket.on('join_room', (data) => {
        users[socket.id] = {
            roomId: data.roomId
        }
        const roomId = data.roomId;
        if(!rooms[roomId]){
            rooms[roomId] = {
                roomId,
                users : []
            }
        }
        rooms[roomId].users.push(socket.id);
        socket.join(roomId);
        socket.to(roomId).emit('room_message',`Username: ${data.username} has been joined the room`); 
    });

    socket.on('room_message', (data) => {
        const roomId = users[socket.id].roomId;
        io.to(roomId).emit('room_server_message',data);
    })

});
