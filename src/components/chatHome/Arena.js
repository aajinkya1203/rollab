import React, { useEffect, useState } from 'react'
import { graphql } from 'react-apollo';
import { userDetailWithMessages, sendMessage } from '../../query/queries';
import M from 'materialize-css';
import { flowRight as compose } from 'lodash';
import { animateScroll } from 'react-scroll';
import moment from 'moment';
import socketIOClient from 'socket.io-client';

var socket;

const Arena = (props) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "http://localhost:1000";
    // console.log(props)
    useEffect(()=>{
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log(props);
            socket.emit('newUser', { id: localStorage.getItem('id') }, ()=>{})
        });            

        
        animateScroll.scrollToBottom({
            containerId: "chatListWrapper"
        });
        return ()=>{
            // disconnecting this when it unmounts
            console.log("Dismounting");
            socket.emit('disconnect');
            // disposing instance of the socket var
            socket.off();
        }

    }, []);

    useEffect(()=>{
        socket.on('message', (message)=>{
            console.log(message)
            setMessages([...messages, message]);
        });
        animateScroll.scrollToBottom({
            containerId: "chatListWrapper"
        });
    });

    useEffect(()=>{
        if(props.props.match.params.id){
            socket.emit('privChat', { from: localStorage.getItem('id') , to: props.props.match.params.id})
        }
    },[props.props.match.params.id])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message === ""){
            M.toast({html:"Slow down, partner. Write a message first."})   
        }else{
            let messageId = JSON.parse(localStorage.getItem('user')).messages.idl
            let op = true;
            socket.emit('sendPriv', { message, from: localStorage.getItem('id') , to: props.props.match.params.id },(resp) => {
                console.log(resp);
                op = resp;
            });
            if(op){
                await props.sendMessage({
                    variables:{
                        text: message,
                        sender: localStorage.getItem('id'),
                        id: messageId,
                        person: props.data.user.id,
                        personId: props.data.user.message.id,
                        userId: localStorage.getItem('id')
                    }
                })
            }else{
                await props.sendMessage({
                    variables:{
                        text: message,
                        sender: localStorage.getItem('id'),
                        id: messageId,
                        person: props.data.user.id,
                        personId: props.data.user.message.id,
                        userId: localStorage.getItem('id')
                    },
                    refetchQueries: [ { query: userDetailWithMessages, variables: {
                        id: props.props.match.params.id,
                        profileId: localStorage.getItem("id")
                    } } ]
                })

            }
        }
    }
    console.log("Data:",message, messages);
    return(
        <>
        {
            props.props.location.pathname === '/chat' || 
            props.props.location.pathname === '/chat/groups'
            ? (
                <div>
                    Click any contact to start chatting...
                </div>
            ) : (
                props.data.user ? (
                    <div className="arena col s12 m7 l8" key={props.data.user.id}>
                        <div className="info">
                            <span 
                            className="btn btn-large btn-floating waves-effect waves-light"
                                style={{
                                    backgroundColor:"#259ee9"
                                }}
                            >
                                {props.data.user.name[0]}
                            </span>
                            <h5 className="person center-align">
                                {
                                    props.props.location.pathname === "/chat/groups" ? "VAMS" : props.data.user.name
                                }
                            </h5>
                        </div>
                        <div className="divider"></div>
            
                        <div className="editor col s11 m7 l8">
                            <div className="input-field inline" onSubmit={handleSubmit}>
                                <input type="text" name="message" id="message" 
                                value={message}
                                placeholder="Type something..."
                                onChange={e => setMessage(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' ? handleSubmit(e) : null }
                                />
                            </div>
                            <a className="btn-floating prefix" href="#!"
                                onClick={handleSubmit}
                                style={{
                                    backgroundColor:"#259ee9",
                                }}
                            >
                                <i className="material-icons">send</i>
                            </a>
                        </div>
        
                        <div className="chats col s11 m7 l8">
                            <ul id="chatListWrapper">
                                {
                                    (props.data.loading) === false &&  props.data.user.message.convos ? 
                                    (
                                        props.data.user.message.convos.messages.map(ele=>{
                                            return(
                                                <div className="container" key={Math.random()}>
                                                    <div className="left-align chip User">
                                                        {ele.sender.name}
                                                    </div>
                                                    <div className="message">
                                                        {ele.text}
                                                    </div>
                                                    <div className="time right-align">
                                                        <i>
                                                            { moment(parseInt(ele.time)).fromNow() }
                                                        </i>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div>
                                            No message yet
                                        </div>
                                    )
                                }
                            </ul>
                        </div>

                    </div>                    
                ) : (
                    <div>
                        Click any contact to start chatting...
                    </div>
                )
            )
        }
        </>
    )
}

export default compose(
    graphql(userDetailWithMessages,{
        options: (props)=>{
            return{
                variables:{
                    id: props.props.match.params.id,
                    profileId: localStorage.getItem("id")
                }
            }
        }
    }),
    graphql(sendMessage, { name: "sendMessage" })
)(Arena)
