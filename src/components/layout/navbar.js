import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'

const Navbar=()=> {
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
          });
    })
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">rollab</NavLink>
                <NavLink to="#!" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </NavLink>
                <ul className="right hide-on-med-and-down nnv">
                    <li><NavLink to="/login" activeClassName="activeLink">Sign In</NavLink></li>
                    <li><NavLink to="/sign-up" activeClassName="activeLink">Sign Up</NavLink></li>
                    <li><NavLink to="/logout" activeClassName="activeLink">Log out</NavLink></li>
                    <li><NavLink to="/contacts" activeClassName="activeLink">Contacts</NavLink></li>
                    <li><NavLink to="/arena" activeClassName="activeLink">Arena</NavLink></li>
                </ul>
                </div>
            </nav>
            <ul className="sidenav nnv" id="mobile-demo">
                <li><NavLink to="/login" activeClassName="activeLink">Sign In</NavLink></li>
                <li><NavLink to="/sign-up" activeClassName="activeLink">Sign Up</NavLink></li>
                <li><NavLink to="/logout" activeClassName="activeLink">Log out</NavLink></li>
                <li><NavLink to="/contacts" activeClassName="activeLink">Contacts</NavLink></li>
                <li><NavLink to="/arena" activeClassName="activeLink">Arena</NavLink></li>
            </ul>
        </>
    )
}

export default Navbar
