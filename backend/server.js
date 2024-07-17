import { config } from 'dotenv';
config({path: './config.env'});
import mongoose from 'mongoose';
const port = process.env.PORT || 3000;
import { server } from './app.js';
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);

mongoose.connect(DB).then(()=>{
    console.log("Connected to database");
});
server.listen(3000, () => {
    console.log('Connected to the server at PORT 3000');
});




