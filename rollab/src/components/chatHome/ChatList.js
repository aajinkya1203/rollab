import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { allUsers, allContacts, allMyGroups } from '../../query/queries';
import { flowRight as compose } from 'lodash';
import NewGroup from '../popups/NewGroup';

const ChatList = (props)=> {
    const [cont, setCont] = useState([]);
    const [groups, setGroups] = useState([]);
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            props.props.history.push('/');
        }
    })
    useEffect(()=>{
        if(props.allContacts && props.allContacts.allContacts){
            setCont(props.allContacts.allContacts.people)
        }
        if(props.allMyGroups && props.allMyGroups.allMyGroups){
            setGroups(props.allMyGroups.allMyGroups)
        }
    }, [props])
    const handleChange=(e)=>{
        e.preventDefault();
        if(props.props.match.path ==="/chat/groups/:gid" || props.props.match.path ==="/chat/groups"){
            setGroups(props.allMyGroups.allMyGroups.filter(ele=>(ele.name.toLowerCase()).startsWith(e.target.value.toLowerCase())));
        }else{
            setCont(props.allContacts.allContacts.people.filter(ele=>(ele.email.toLowerCase()).startsWith(e.target.value.toLowerCase())));
        }
    }
    return (
        <div id="contactList" className="col m3 l3 hide-on-small-only" style={{overflowY: "scroll"}}>
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
                        props.props.match.path === "/chat/groups" || props.props.match.path ==="/chat/groups/:gid"
                        ? "GROUPS" : "CONTACTS"
                    }
                    {
                        props.props.match.path === "/chat/groups" || props.props.match.path ==="/chat/groups/:gid"
                        ? (
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
                        props.props.match.path !== "/chat/groups" && props.props.match.path !=="/chat/groups/:gid"
                        ? (
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
                            groups.length !== 0 ? (
                                groups.map(ele => {
                                    return (
                                        <li className="collection-item avatar truncate" key={ ele.id }>
                                            <span className="grey-text" >
                                                <strong style={{
                                                    fontSize: "20px",
                                                    margin: "0 5px"
                                                }}>#</strong>
                                            </span>
                                            <Link to={`/chat/groups/${ele.id}`} className="title center-align">{ ele.name }</Link>
                                        </li>
                                    )
                                })
                            ) : (
                                <div>
                                    No groups :(
                                </div>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default compose(
    graphql(allUsers),
    graphql(allMyGroups, { 
        name: "allMyGroups",
        options: (props) =>{
            return{
                variables:{
                    id: localStorage.getItem("id"),
                }
            }
        }
    }),
    graphql(allContacts, {
        name: "allContacts",
        options: (props) =>{
            return{
                variables:{
                    id: JSON.parse(localStorage.getItem('user')).contacts.id,
                }
            }
        }
    }),
)(ChatList)
