import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import Arena from './Arena';

const ChatHome = (props) => {
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            props.history.push('/');
        }
    },[]);
    return (
        <div id="chatting" className="row">
            <Sidebar/>
            <ChatList props={props}/>
            <Arena props={props}/>
        </div>
    )
}

export default ChatHome

