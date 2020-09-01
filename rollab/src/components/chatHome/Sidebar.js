import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { addContact, allUsers, userDetails } from '../../query/queries';
import M from 'materialize-css';

const Sidebar=(props)=> {
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.tooltipped').tooltip();
            window.$('.modal').modal();
        });
    });
    const addContact= async (to, toCont)=>{
        let from = localStorage.getItem("id");
        let fromCont = localStorage.getItem("user");
        fromCont = JSON.parse(fromCont).contacts.id;
        let data = await props.addContact({
            variables:{
                from,
                toCont,
                to,
                fromCont
            },
            refetchQueries: [ { query: allUsers }, { query: userDetails } ]
        });
        if(!data.data.addContact){
            M.toast({ html: "You've already added them to your contacts!" });
        }
    }
    return (
        <>
        <div className="sidebar col m1 l1 hide-on-small-only">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="roundy" 
                        className="btn btn-floating z-depth-0 btn-large tooltipped"
                        data-position="right" data-tooltip="rollab"
                    >
                        <h5>r</h5>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#!" activeClassName="roundy"
                        className="btn btn-floating modal-trigger z-depth-0 btn-large tooltipped"
                        data-position="right" data-tooltip="Find Contacts"
                        data-target="modal1"
                    >
                        <i className="material-icons">search</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat" activeClassName="roundy"
                        className="btn btn-floating  z-depth-0 btn-large tooltipped"
                        data-position="right" data-tooltip="Chats"
                    >
                        <i className="material-icons">chat_bubble_outline</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chat/groups" activeClassName="roundy"
                        className="btn btn-floating  z-depth-0 btn-large tooltipped"
                        data-position="right" data-tooltip="Groups"
                    >
                        <i className="material-icons">group</i>
                    </NavLink>
                </li>
            </ul>
            <ul className="down">
                <li>
                    <NavLink to="#!" activeClassName="roundy"
                        className="btn btn-floating  z-depth-0 btn-large tooltipped"
                        data-position="right" data-tooltip="Profile"
                    >
                        AS
                    </NavLink>
                </li>
            </ul>
        </div>
        <div id="modal1" className="modal modal-fixed-footer">
            <div className="modal-content">
            <h4>Find new friends...</h4>
            <div className="input-field col s12">
                <input type="text" className="validate" style={{
                    height: "48px",
                    color:"white"
                }}/>
                <label htmlFor="first_name">Search</label>
            </div>
            <ul className="collection searched">
                { props.allUsers && props.allUsers.allUsers ? (
                    props.allUsers.allUsers.map(user=>{
                        if(user.id === localStorage.getItem("id")){
                            return;
                        }
                        return(
                            <li 
                            onClick={()=>addContact(user.id, user.contacts.id)}
                            className="collection-item avatar truncate" key={user.id}>
                                <span 
                                className="btn btn-large btn-floating"
                                >
                                    {user.name[0]}
                                </span>
                                <span className="title center-align">{user.name}</span>
                                <div className="center-align chip">
                                    {user.email}
                                </div>
                            </li>
                        )
                    })
                ) : (
                    <div>
                        Loading...
                    </div>
                )
                    
                }
            </ul>
            </div>
            <div className="modal-footer">
            <a href="#!" className="modal-close green btn-flat">close</a>
            </div>
        </div>
        </>    )
}

export default compose(
    graphql(allUsers, { name: "allUsers" }),
    graphql(userDetails, { name: "userDetails" }),
    graphql(addContact, { name: "addContact" })
)(Sidebar);
