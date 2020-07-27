import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

const Navbar=(props)=> {
    const [test, setTest] = useState(0);
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.sidenav').sidenav();
        });
    });
    const rerender =()=>{
        setTest("");
    }
    
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
                            <SignedInLinks rerender={rerender}/>
                        ) : (
                            <SignedOutLinks rerender={rerender}/>
                        )
                    }
                </ul>
                </div>
            </nav>
            <ul className="sidenav nnv" id="mobile-demo">
                {
                    localStorage.getItem('token') ? (
                        <SignedInLinks rerender={rerender}/>
                    ) : (
                        <SignedOutLinks rerender={rerender}/>
                    )
                }
            </ul>
        </>
    )
}

export default Navbar
