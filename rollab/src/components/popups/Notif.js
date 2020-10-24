import React, { useEffect } from 'react'

const Notif = (props) => {
    useEffect(()=>{
        window.$(document).ready(function(){
            window.$('#notice').modal({
                dismissible: false
            });
            if(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) <= 600){
                window.$('#notice').modal('open');
                setTimeout(function(){
                    window.$('#notice').modal('close');
                    localStorage.clear();
                    props.history.push('/');
                }, 10000);
            }
        });
    })
    return (
        <div id="notice" className="modal">
            <div className="modal-content" style={{height:"100%", padding: 0}}>
                <div className="NoticeWrapper" style={{height:"80%"}}>
                </div>
                <div>
                <p style={{textAlign: "center", padding: "10px 15px"}}>
                    <strong>To all the mobile users!</strong><br />
                    <div className="divider" style={{background: "grey", marginTop: "20px"}}></div><br />
                    <br />
                    Most of the key features are disabled for smaller screen size to avoid
                    any unpleasent experience. 
                    <br /><br />
                    Therefore, you are expected to log in from a device with a larger screen size!
                    <br /><br />
                    Team rollab.
                </p>
                </div>
            </div>
        </div>
    )
}

export default Notif
