import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

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
                <Link to="/" className="brand-logo">rollab</Link>
                <Link to="#!" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </Link>
                <ul className="right hide-on-med-and-down">
                    <li><Link to="/login">Sign In</Link></li>
                    <li><Link to="/sign-up">Sign Up</Link></li>
                    <li><Link to="/">Log out</Link></li>
                    <li><Link to="/home/contacts">Contacts</Link></li>
                    <li><Link to="/home/arena">Arena</Link></li>
                </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><Link to="/sign-in">Sign In</Link></li>
                <li><Link to="/sign-up">Sign Up</Link></li>
                <li><Link to="/">Log out</Link></li>
                <li><Link to="/home/contacts">Contacts</Link></li>
                <li><Link to="/home/arena">Arena</Link></li>
            </ul>
        </>
    )
}

export default Navbar
