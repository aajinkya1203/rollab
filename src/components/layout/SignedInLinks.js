import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks=(props)=> {
    return (
        <>
            <li><NavLink to="/" 
                onClick={()=>{
                    localStorage.clear();
                    props.rerender();
                }}
            activeClassName="activeLink">Log out</NavLink></li>
            <li><NavLink to="/contacts" activeClassName="activeLink">Contacts</NavLink></li>
            <li><NavLink to="/arena" activeClassName="activeLink">Arena</NavLink></li>
        </>
    )
}

export default SignedInLinks
