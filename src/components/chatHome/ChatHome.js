import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import Arena from './Arena';
import { userDetails } from '../../query/queries';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';

const ChatHome = (props) => {

    useEffect(()=>{
        console.log(props)
        if(!localStorage.getItem('token')){
            props.history.push('/');
        }

    });
    return (
        <div id="chatting" className="row">
            <Sidebar/>
            <ChatList props={props}/>
            <Arena props={props}/>
        </div>
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

