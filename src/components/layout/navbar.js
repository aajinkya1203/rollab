import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

const Navbar=(props)=> {
    useEffect(()=>{
        console.log(props);
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
          });
    });
    
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">rollab</NavLink>
                <NavLink to="#!" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </NavLink>
                <ul className="right hide-on-med-and-down nnv">
                    {
                        localStorage.getItem('token') ? (
                            <SignedInLinks />
                        ) : (
                            <SignedOutLinks />
                        )
                    }
                </ul>
                </div>
            </nav>
            <ul className="sidenav nnv" id="mobile-demo">
                {
                    localStorage.getItem('token') ? (
                        <SignedInLinks />
                    ) : (
                        <SignedOutLinks />
                    )
                }
            </ul>
        </>
    )
}

export default Navbar
