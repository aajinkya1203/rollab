import React, { useEffect, useState } from 'react'
import { graphql, useQuery, useLazyQuery } from 'react-apollo';
import { userDetailWithMessages, sendMessage, getAGroup } from '../../query/queries';
import M from 'materialize-css';
import { flowRight as compose } from 'lodash';
import { animateScroll } from 'react-scroll';
import moment from 'moment';
import socketIOClient from 'socket.io-client';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import Navbar from '../layout/Header';

var socket;

const Arena = (props) => {
    const [chats, setMessages] = useState([]);
    const [userDetsWithMsg, {loading, data}] = useLazyQuery(userDetailWithMessages,{
        fetchPolicy: 'network-only'
    });
    console.log(props)
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

        // if(socket){
            socket.on('comm', async (data)=>{
                console.log("Message event triggered",data);
                let loc = window.location.href;
                let re = /\/chat\/(.+)/gi
                let re2 = /\b(?:(?!chat)\w)+\b/gi
                let test = loc.match(re)
                
                if(!test){
                    console.log("NOYS")
                }else{
                    test = (test[0]).match(re2)
                    // console.log("Regex:", test[0])
                    // console.log("Len:", test[0].length)
                    if((!(data.bonus).includes(test[0]))){
                        console.log("NOYS")
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
                        
                        if(document.querySelector("#chatListWrapper")){
                            document.querySelector("#chatListWrapper").appendChild(div);
                            animateScroll.scrollToBottom({
                                containerId: "chatListWrapper"
                            });
                        }else{
                            M.toast({ html: "You might wanna refresh to get some fresh gossip! (ᵔᴥᵔ)" })
                        }
                    }
                }
            });

            socket.on('stop-type', data=>{
                if(document.querySelector('#typingBox')){
                    document.querySelector('#typingBox').style.display = "none"
                }
                if(document.querySelector('#typedStatus')){
                    document.querySelector('#typedStatus').innerText = ""
                }
            })

            socket.on('updateStat', (data)=>{
                if(document.querySelector(`#u${data.id}`)){
                    document.querySelector(`#u${data.id}`).innerText = "Online"
                }
            })
            socket.on('delStat', (data)=>{
                if(document.querySelector(`#u${data.id}`)){
                    document.querySelector(`#u${data.id}`).innerText = "Offline"
                }
            })
        // }
        
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
        if(socket && props.match.params.id){
            socket.on('type', data=>{
                console.log("here")
                console.log(data.source)
                console.log(props.match.params.id)
                if(props.match.params.id === data.source){
                    if(document.querySelector('#typingBox')){
                        document.querySelector('#typingBox').style.display = "block"
                    }
                    if(document.querySelector('#typedStatus')){
                        document.querySelector('#typedStatus').innerText = data.msgFormat
                    }
                }
            })
        }
        return ()=>{
            socket.removeListener("type");
        }
    },[props.match.params])

    useEffect(()=>{
        if(props.match.params.id){
            socket.emit('privChat', { from: localStorage.getItem('id') , to: props.match.params.id})
        }
    },[props.match.params.id]);

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
            await socket.emit('sendPriv', { message, from: localStorage.getItem('id') , to: props.match.params.id, name, time: new Date().getTime() }, async (resp) => {
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
                            id: props.match.params.id,
                            profileId: localStorage.getItem("id")
                        } } ]
                    });
                }
            })
            animateScroll.scrollToBottom({
                containerId: "chatListWrapper"
            });
        }
    }
    useEffect(() => {
        if(chats.length !== 0){
            userDetsWithMsg({ variables: {
                id: props.match.params.id,
                profileId: localStorage.getItem("id")
            }})
        }
        if((props.data.loading) === false && props.data.user && props.data.user.message.convos){
            setMessages(props.data.user.message.convos);
            M.toast({ html: "Holup! We are looking for some new changes." })           
        }
    }, [props.data.user]);

    const typing = async (e) => {
        let name = JSON.parse(localStorage.getItem('user')).name;
        if(e.target.value == ""){
            await socket.emit('stop-typing', { from: localStorage.getItem('id') , to: props.match.params.id, name }, async (resp)=>{
                console.log(resp)
            });
        }else{
            await socket.emit('typing', { from: localStorage.getItem('id') , to: props.match.params.id, name }, async (resp)=>{
                console.log(resp)
            });

        }
    }
    return(
        <>
        <Navbar props={props}/>
            <div id="chatting" className="row">
                <Sidebar/>
                <ChatList props={props}/>
                {
                    (props.location.pathname === '/chat' || 
                    props.location.pathname === '/chat/groups') && props.match.isExact === true
                    ? (
                        <div>
                            Click any contact to start chatting...
                        </div>
                    ) : (
                        props.data.user || props.getAGroup.group ? (
                            <div className="arena col s12 m7 l8" key={Math.random()}>
                                <div className="info">
                                    <span 
                                    className="btn btn-large btn-floating waves-effect waves-light"
                                        style={{
                                            backgroundColor:"#259ee9"
                                        }}
                                    >
                                        {
                                            props.match.path === "/chat/groups" ? <strong>{"#"}</strong> : props.data.user.name[0]
                                        }
                                    </span>
                                    <h5 className="person center-align">
                                        {
                                            props.match.path === "/chat/groups" ? props.getAGroup.group.name : props.data.user.name
                                        }
                                    </h5>
                                </div>
                                <div className="divider"></div>
                    
                                <div className="editor col s11 m7 l8">
                                    <div className="input-field inline" onSubmit={handleSubmit}>
                                        <input type="text" name="message" id="message" 
                                        placeholder="Type something..."
                                        onKeyPress={e => e.key === 'Enter' ? handleSubmit(e) : null }
                                        onKeyUp={typing}
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
                                    <p id="typingBox" style={{display:"none"}}>
                                        {/* typing status will be here */}
                                        <i id="typedStatus" className="grey-text">
                                        </i>
                                        <span className="grey-text">
                                            ...
                                        </span>
                                    </p>
                                </div>

                            </div>                    
                        ) : (
                            <div>
                                Click any contact to start chatting...
                            </div>
                        )
                    )
                }
        </div>
        </>
    )
}

export default compose(
    graphql(userDetailWithMessages,{
        options: (props)=>{
            return{
                variables:{
                    id: props.match.params.id,
                    profileId: localStorage.getItem("id")
                },
                // pollInterval: 2000
            }
        }
    }),
    graphql(getAGroup,{
        name: "getAGroup",
        options: (props) => {
            let loc = window.location.href;
            let re2 = /\b(?:(?!chat)\w)+\b/gi
            let test = loc.match(re2)
            if(test.length >= 5){
                test = test[4]
            }else{
                test = null
            }
            
            return{
                variables: {
                    id: test
                }
            }
        }
    }),
    graphql(sendMessage, { name: "sendMessage" })
)(Arena)

// export default Arena;