import React, { useEffect } from 'react';
import Features from './features';
import { Link } from 'react-router-dom';
import Cover from '../../images/testCover.jpg';
import Floating from '../svgs/test';
import Footer from './Footer';

const Home = () => {

    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('.parallax').parallax();
          });
    },[]);
    
    return (
        <div>
            <div className="section row" style={{
                    "backgroundColor":"#ee6e6e",
                    "paddingBottom":"0"
                    }}>
                <div className="container introSection col s12">
                    {/* <img src={introCovered} alt="cover" className="col s12 l6 push-l6" /> */}
                    <Floating />
                    <h2 className="header col s12 l6 center rollabTitle">rollab</h2>
                    <p id="tagline" className="grey-text text-darken-3 lighten-3 col s12 l6 center">
                        <i>
                            A new era of communicating!
                        </i>
                    </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                    style={{"display":"block"}}
                >
                    <path fill="#ffffff" fillOpacity="1" d="M0,0L48,10.7C96,21,192,43,288,53.3C384,64,480,64,576,85.3C672,107,768,149,864,165.3C960,181,1056,171,1152,186.7C1248,203,1344,245,1392,266.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
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

            <Footer />

        </div>
    )
}

export default Home
