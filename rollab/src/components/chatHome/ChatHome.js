import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import { userDetails } from '../../query/queries';
import { graphql } from 'react-apollo';
import Navbar from '../layout/Header';
import { animateScroll } from 'react-scroll';


const ChatHome = (props) => {

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            props.history.push('/');
        }
        animateScroll.scrollToBottom();
    });
    useEffect(()=>{
        animateScroll.scrollToBottom();
    },[]);
    return (
        <>
            <Navbar props={props}/>
            <div id="chatting" className="row">
                <Sidebar/>
                <ChatList props={props}/>
            </div>
        </>
    )
}

export default graphql(userDetails,{
    options: (props) =>{
        return{
            variables:{
                id: localStorage.getItem('id'),
            }
        }
    }
})(ChatHome);

