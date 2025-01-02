import { WebSocketServer,WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets : WebSocket[] = [];
wss.on('connection', (socket)=> {
    socket.on('error', console.error);
    allSockets.push(socket);
    console.log("User Connected",userCount);
    userCount++;
    
    socket.on('message',(msg)=>{
        console.log(msg.toString())
        var temp = msg.toString();
        allSockets.map((sckt)=>sckt.send(temp.toString()));
    })
    
});