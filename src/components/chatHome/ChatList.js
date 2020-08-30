import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { allUsers, allContacts } from '../../query/queries';
import { flowRight as compose } from 'lodash';
import _ from 'lodash';
import NewGroup from '../popups/NewGroup'

const ChatList = (props)=> {
    const [cont, setCont] = useState([]);
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            props.props.history.push('/');
        }
    })
    useEffect(()=>{
        if(props.data && props.data.allContacts){
            setCont(props.data.allContacts.people)
        }
    }, [props])
    const handleChange=(e)=>{
        e.preventDefault();
        setCont(props.data.allContacts.people.filter(ele=>ele.email.startsWith(e.target.value)));
    }
    return (
        <div id="contactList" className="col m3 l3 hide-on-small-only">
            <div className="input-field searchCont" style={{
                color:"#259ee9"
            }}>
                <i className="material-icons prefix" style={{
                    paddingTop:"5px"
                }}>search</i>
                <input type="text" name="searchList" id="searchList"
                    style={{
                        color:"white"
                    }}
                    placeholder="Search amongst your contacts..."
                    onChange={handleChange}
                />
            </div>
            {/* <div className="divider"></div> */}
            <div>
                <div className="grey-text">
                    {
                        props.props.location.pathname === "/chat/groups" ? "GROUPS" : "CONTACTS"
                    }
                    {
                        props.props.location.pathname === "/chat/groups" ? (
                            <i className="material-icons right modal-trigger"
                                style={{cursor:"pointer"}}
                                data-target="modal2"
                            >add</i>
                        ) : null
                    }
                    
                </div>   
                <NewGroup/>            
                <ul className="listing">
                    {
                        props.props.location.pathname !== "/chat/groups" ? (
                            cont.length !== 0 ? (
                                cont.map(ele=>{
                                    return (
                                        <li className="collection-item avatar truncate" key={ ele.id }>
                                            <span 
                                            className="btn btn-floating"
                                            >
                                                { ele.name[0] }
                                            </span>
                                            <Link to={`/chat/${ele.id}`} className="title center-align">{ ele.name }</Link>
                                            <div className="center-align chip" id={`u${ele.id}`}>
                                                Offline 
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <div>
                                    Looks a bit dry ◔_◔
                                </div>
                            )

                        ) : (
                            <div>
                                No groups :(
                            </div>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default compose(
    graphql(allUsers),
    graphql(allContacts, { 
        options: (props) =>{
            return{
                variables:{
                    id: JSON.parse(localStorage.getItem('user')).contacts.id,
                }
            }
        }
     })
)(ChatList)
