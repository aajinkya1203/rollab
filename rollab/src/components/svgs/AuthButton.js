import React, { useEffect } from 'react';
import './AuthButton.css';

const AuthButton = () => {

    return (
        <>
            <button id="buttonly" className="ready" onClick="clickButton()">
  
            <div className="message-glu submitMessage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12.2">
                <polyline stroke="currentColor" points="2,7.1 6.5,11.1 11,7.1 "/>
                <line stroke="currentColor" x1="6.5" y1="1.2" x2="6.5" y2="10.3"/>
                </svg> <span className="buttonly-text">Submit</span>
            </div>
            
            <div className="message-glu loadingMessage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
                <circle className="loadingCircle" cx="2.2" cy="10" r="1.6"/>
                <circle className="loadingCircle" cx="9.5" cy="10" r="1.6"/>
                <circle className="loadingCircle" cx="16.8" cy="10" r="1.6"/>
                </svg>
            </div>
            
            <div className="message-glu successMessage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
                <polyline stroke="currentColor" points="1.4,5.8 5.1,9.5 11.6,2.1 "/>
                </svg> <span className="buttonly-text">Success</span>
            </div>
            </button>

            <canvas id="canvas"></canvas>
            {/* <script src="./Effect.js"></script> */}
        </>
    )
}

export default AuthButton
