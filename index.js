import express from "express"
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';
const port = 3000

const app = express();

const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST'],
        credentials:true
    }
});

// Enable CORS
app.use(cors());



io.on('connection',(socket)=>{
    console.log("user connected:",socket.id)

    socket.on('message',({message,room})=>{
     
       io.to(room).emit('receiveMessage',message)
    })

    // socket.on('joinRoom',(room)=>{
    //     socket.join(room)

    //     console.log('user join room',room)
    // })

    socket.on('disconnected',()=>{
        console.log('disconnected')
    })
    
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})