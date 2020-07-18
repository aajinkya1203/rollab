import React from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import Arena from './Arena';

const ChatHome = (props) => {
    return (
        <div id="chatting" className="row">
            <Sidebar/>
            <ChatList props={props}/>
            <Arena props={props}/>
        </div>
    )
}

export default ChatHome

