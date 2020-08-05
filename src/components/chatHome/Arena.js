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
    const [chats, setMessages] = useState([]);
    const ENDPOINT = "http://localhost:1000";
    // console.log(props)
    useEffect(()=>{
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log(props);
            socket.emit('newUser', { id: localStorage.getItem('id') }, ()=>{})
        });            

        socket.on('comm', (message)=>{
            console.log("Message event triggered",message);
            console.log(chats)
            let tempRec = {...chats}
            console.log(tempRec)
            setMessages({
                ...chats,
                messages: (tempRec.messages).push(message)
            });
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
        animateScroll.scrollToBottom({
            containerId: "chatListWrapper"
        });
        if((props.data.loading) === false && props.data.user && props.data.user.message.convos){
            setMessages(props.data.user.message.convos);
        }
    });

    useEffect(()=>{
        if(props.props.match.params.id){
            socket.emit('privChat', { from: localStorage.getItem('id') , to: props.props.match.params.id})
        }
    },[props.props.match.params.id]);

    // useEffect(()=>{
        
    // },[message]);
    console.log("Heaven:")
    console.log({...chats})
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(message === ""){
            M.toast({html:"Slow down, partner. Write a message first."})   
        }else{
            let messageId = JSON.parse(localStorage.getItem('user')).messages.id;
            let name = JSON.parse(localStorage.getItem('user')).name;
            let op = false;
            await socket.emit('sendPriv', { message, from: localStorage.getItem('id') , to: props.props.match.params.id, name, time: new Date() }, async (resp) => {
                console.log(resp);
                op = resp;
                console.log("OP:",op);
                if(op===true){
                    console.log("socketed")
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
                    console.log("db")
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
                    });
                    setMessages(props.data.user.message.convos);
                }
            })
            setMessage('');
           
        }
    }
    useEffect(() => {
        if((props.data.loading) === false && props.data.user && props.data.user.message.convos){
            setMessages(props.data.user.message.convos);
        }
    }, [props.data.user]);
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
                                    chats && chats.messages ? 
                                    (
                                        chats.messages.map(ele=>{
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
