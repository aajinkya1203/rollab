import React, { useEffect, useState } from 'react'
import { graphql, useQuery, useLazyQuery } from 'react-apollo';
import { userDetailWithMessages, sendMessage } from '../../query/queries';
import M from 'materialize-css';
import { flowRight as compose } from 'lodash';
import { animateScroll } from 'react-scroll';
import moment from 'moment';
import socketIOClient from 'socket.io-client';

var socket;

const Arena = (props) => {
    const [chats, setMessages] = useState([]);
    const [userDetsWithMsg, {loading, data}] = useLazyQuery(userDetailWithMessages,{
        fetchPolicy: 'network-only'
    });
    const ENDPOINT = "http://localhost:1000";

    // console.log(props)
    useEffect(()=>{
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log("Connected");
            socket.emit('newUser', { id: localStorage.getItem('id') }, ()=>{})
        });

        const getDets = async ()=>{
            let status = await props.data.loading;
            let again = await props.data.user;
            // let oneMore = await props.data.user.message.convos;
            if((props.data.loading) === false && props.data.user && props.data.user.message.convos){
                setMessages(props.data.user.message.convos);
            }
        }

        getDets();

        if(socket){
            socket.on('comm', async (data)=>{
                console.log("Message event triggered",data);
                console.log(!(props.props.match.params.id))
                console.log(!(data.bonus).includes(props.props.match.params.id))
                
                if((!(props.props.match.params.id)) || (!(data.bonus).includes(props.props.match.params.id))){
                    console.log("Not on your screen!")
                }else{
                    let div = document.createElement('div');
                    div.className="container"
                    div.setAttribute('key', Math.random());
                    let div2 = document.createElement('div');
                    div2.className="left-align chip User";
                    div2.innerText = data.sender.name
                    let div22 = document.createElement('div');
                    div22.className="message";
                    div22.innerText = data.text;
                    let div23 = document.createElement('div');
                    div23.className="time right-align";
                    let i = document.createElement('i');
                    i.innerText = moment(parseInt(data.time)).fromNow()
                    div23.appendChild(i);
        
                    // structuring the whole thing
                    div.append(div2)
                    div.append(div22)
                    div.append(div23)
        
                    document.querySelector("#chatListWrapper").appendChild(div);
                }
                console.log(props)

                animateScroll.scrollToBottom({
                    containerId: "chatListWrapper"
                });
                return;
            });
        }
        
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
        
    },[chats]);

    useEffect(()=>{
        if(props.props.match.params.id){
            console.log("priv chat emitted")
            socket.emit('privChat', { from: localStorage.getItem('id') , to: props.props.match.params.id})
        }
    },[props.props.match.params.id]);

    const handleSubmit = async (e) => {
        let message = document.querySelector('#message').value;
        e.preventDefault();
        if(message === ""){
            M.toast({html:"Slow down, partner. Write a message first."})   
        }else{
            document.querySelector('#message').value = ''
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
                    // setMessages(props.data.user.message.convos);
                }
            })
        }
    }
    useEffect(() => {
        if(chats.length !== 0){
            userDetsWithMsg({ variables: {
                id: props.props.match.params.id,
                profileId: localStorage.getItem("id")
            }})
            if(!loading && data){
                // console.log(data)
            }
        }
        if((props.data.loading) === false && props.data.user && props.data.user.message.convos){
            setMessages(props.data.user.message.convos);
        }
    }, [props.data.user]);


    // console.log("Data hai:", chats)
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
                                placeholder="Type something..."
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
                },
                // pollInterval: 2000
            }
        }
    }),
    graphql(sendMessage, { name: "sendMessage" })
)(Arena)

// export default Arena;