import React, { useEffect } from 'react';
import Navbar from '../layout/Header';
import './landing.css';
import Bot from '../../images/Games/bot.png'
import Mates from '../../images/Games/mates.png'
import { Link } from 'react-router-dom';

const Landing = (props) => {
    useEffect(() => {
        // some basic animation
        const content = document.querySelector(".content-game");
        const left = document.querySelector(".leftzy");
        const right = document.querySelector(".rightzy");

        left.addEventListener('mouseenter', () => {
        content.classList.add('hover-left');
        })

        left.addEventListener('mouseleave', () => {
        content.classList.remove('hover-left');
        })

        right.addEventListener('mouseenter', () => {
        content.classList.add('hover-right');
        })

        right.addEventListener('mouseleave', () => {
        content.classList.remove('hover-right');
        })
    }, [])
    return (
        <>
            <Navbar props={props} />
           <div className="content-game hide-on-small-only">
                <div className="splitzy leftzy">
                <img src={Bot} alt="" className="skateboard" />
                <div className="text">
                    <p className="subtitle">go against</p>
                    <h1 className="title">a<br/>bot</h1>
                    <br/>
                    <Link to="/game/solo" className="buttony">EXPLORE</Link>
                </div>
                </div>
                <div className="splitzy rightzy">
                <img src={Mates} alt="" className="shoes" />
                <div className="text">
                    <p className="subtitle">go against</p>
                    <h1 className="title">your<br/>mates</h1>
                    <br/>
                    <Link to="/game/online" className="buttony">EXPLORE</Link>
                </div>
                </div>
            </div>
             {/* for mobile design */}
            <div style={{display:"none"}} className="row show-on-small">
                <div className="col s12">
                <div className="card-panel center-align forMob">
                    <span className="white-text texty center-align">
                    <h5>
                        Go against a bot
                    </h5>
                    <Link to="/game/solo" className="buttony">EXPLORE</Link>
                    </span>
                </div>
                </div>
                 {/* another tab */}
                <div className="col s12">
                <div className="card-panel #ffb300 amber darken-1 center-align forMob">
                    <span className="white-text texty center-align">
                    <h5>
                        Go against your mates
                    </h5>
                    <Link to="/game/online" className="buttony">EXPLORE</Link>
                    </span>
                </div>
                </div>
            </div> 
        </>
    )
}

export default Landing
