import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://localhost:1000");

// on connection
socket.once('connect',()=>{
    console.log(socket.id);
});

// on message
socket.on('message', message=>{
    console.log(message)
})


module.exports = socket;