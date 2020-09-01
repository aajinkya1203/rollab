import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks=()=> {
    return (
        <>
            <li><NavLink to="/login" activeClassName="activeLink">Sign In</NavLink></li>   
            <li><NavLink to="/sign-up" activeClassName="activeLink">Sign Up</NavLink></li>
        </>
    )
}

export default SignedOutLinks
