import React, { useEffect } from 'react';
import Features from './features';
import { Link } from 'react-router-dom';
import Cover from '../../images/testCover.jpg';

const Home = () => {

    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.parallax').parallax();
          });
    },[]);
    
    return (
        <div>
            <div className="section row white">
                <div className="container introSection col s12">
                    {/* <img src={introCovered} alt="cover" className="col s12 l6 push-l6" /> */}
                    <h2 className="header col s12 center rollabTitle">rollab</h2>
                    <p id="tagline" className="grey-text text-darken-3 lighten-3 col s12 center">
                        <i>
                            A new era of communicating!
                        </i>
                    </p>
                </div>
            </div>
            {/* parallax effect */}

            <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                    <div className="container">
                        <br /><br />
                        <h1 className="header center white-text text-lighten-2">What's new?</h1>
                        <div className="row center">
                            <h5 className="header white-text col s12 light">Learn how you can switch things up with rollab.</h5>
                        </div>
                        <div className="row center">
                        <Link to="/login" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Get Started</Link>
                        </div>
                        <br /><br />
                    </div>
                </div>
                <div className="parallax">
                    <img src={Cover} alt="Features Cover" />
                </div>
            </div>

            <Features />

        </div>
    )
}

export default Home
