import { WebSocketServer } from "ws";


const wss = new WebSocketServer({port:8080});

wss.on('connection',(socket)=>{
    socket.send("hello you are connected to the websocket server")
})