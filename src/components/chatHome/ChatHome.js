import React from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import Arena from './Arena';

const ChatHome = () => {
    return (
        <div id="chatting" className="row">
            <Sidebar/>
            <ChatList />
            <Arena />
        </div>
    )
}

export default ChatHome

