import React from 'react';
import { Link } from 'react-router-dom'

const navbar=()=> {
    return (
        <>
            <nav>
                <div className="nav-wrapper">
                <Link href="/" className="brand-logo">rollab</Link>
                <Link href="#!" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </Link>
                <ul className="right hide-on-med-and-down">
                    <li><Link href="/sign-in">Sign In</Link></li>
                    <li><Link href="/sign-up">Sign Up</Link></li>
                    <li><Link href="/">Log out</Link></li>
                    <li><Link href="/home/contacts">Contacts</Link></li>
                    <li><Link href="/home/arena">Arena</Link></li>
                </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><Link href="/sign-in">Sign In</Link></li>
                <li><Link href="/sign-up">Sign Up</Link></li>
                <li><Link href="/">Log out</Link></li>
                <li><Link href="/home/contacts">Contacts</Link></li>
                <li><Link href="/home/arena">Arena</Link></li>
            </ul>
        </>
    )
}

export default navbar
