import React from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';

const ChatHome = () => {
    return (
        <div id="chatting" className="row">
            <Sidebar/>
            <ChatList />
        </div>
    )
}

export default ChatHome

