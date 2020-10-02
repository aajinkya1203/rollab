import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'; 
import Navbar from '../layout/Header';
import DrawIO from './DrawIO/DrawIO'



const GameHome = (props) => {
    const ENDPOINT = "http://localhost:1000";
    const [socket, setSocket] = useState({})
    useEffect(()=>{
        setSocket(socketIOClient(ENDPOINT));
        // on connection
        if(socket.id){
            socket.once('connect',()=>{
                console.log("Connected");
                // socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
            });

        }
        return ()=>{
            // disconnecting this when it unmounts
            console.log("Dismounting");
            socket.emit('disconnect');
            // disposing instance of the socket var
            socket.off();
        }
    }, []);
    console.log(socket)

    
    const emitDrawing = () => {

    }
    console.log(props)
    return (
        <>
            <Navbar props={props} />
            {
                props && socket.id && props.match.params.rid ? <DrawIO socket={socket} /> : null
            }
        </>
    )
}

export default GameHome;
