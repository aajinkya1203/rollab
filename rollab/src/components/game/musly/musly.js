import React, { useEffect, useState } from 'react';
import './musly.css';
import M from 'materialize-css';
import socketIOClient from 'socket.io-client'; 
import Navbar from '../../layout/Header';
import Share from '../../popups/Share';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';


var socket;

const Musly = (props) => {
    const ENDPOINT = "http://localhost:1000";
    const [people, setPeople] = useState([JSON.parse(localStorage.getItem("user")).name]);

    useEffect(()=>{
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log("Connected");
            socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
        });

        var Messenger = function(el){
            'use strict';
            var m = this;
            
            m.init = function(){
              m.codeletters = "&#*+%?£@§$";
              m.message = 0;
              m.current_length = 0;
              m.fadeBuffer = false;
              m.messages = [
                'Musly - guess the song through the lyrics',
                'You got 10s to guess the answer and only 5 rounds!',
                'Aight, lets begin. Goodluck!',
                'Finesse a nigga with some counterfeit. But now I\'m countin\' this'
              ];
              m.counter = 0;
              
              setTimeout(m.animateIn, 5000);
            };
            
            m.generateRandomString = function(length){
              var random_text = '';
              while(random_text.length < length){
                random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
              } 
              
              return random_text;
            };
            
            m.animateIn = function(){
              if(m.current_length < m.messages[m.message].length){
                m.current_length = m.current_length + 2;
                if(m.current_length > m.messages[m.message].length) {
                  m.current_length = m.messages[m.message].length;
                }
                
                var message = m.generateRandomString(m.current_length);
                window.$(el).html(message);
                
                setTimeout(m.animateIn, 20);
              } else { 
                setTimeout(m.animateFadeBuffer, 20);
              }
            };
            
            m.animateFadeBuffer = function(){
              if(m.fadeBuffer === false){
                m.fadeBuffer = [];
                for(var i = 0; i < m.messages[m.message].length; i++){
                  m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
                }
              }
              
              var do_cycles = false;
              var message = ''; 
              
              for(var i = 0; i < m.fadeBuffer.length; i++){
                var fader = m.fadeBuffer[i];
                if(fader.c > 0){
                  do_cycles = true;
                  fader.c--;
                  message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
                } else {
                  message += fader.l;
                }
              }
              
              window.$(el).html(message);
              
              if(do_cycles === true){
                setTimeout(m.animateFadeBuffer, 50);
              } else {
                  m.counter += 1;
                  if(m.counter > m.messages.length){
                      console.log("above")
                  }else{
                      setTimeout(m.cycleText, 10000);
                  }
              }
            };
            
            m.cycleText = function(){
              m.message = m.message + 1;
              if(m.message >= m.messages.length){
                m.message = 0;
              }
              
              m.current_length = 0;
              m.fadeBuffer = false;
              window.$(el).html('');
              
              setTimeout(m.animateIn, 200);
            };
            
            m.init();
          }
          
          console.clear();
          var messenger = new Messenger(window.$('#messenger-musly'));
    }, []);
    const sendMsg = (e) => {
        socket.emit('gameChat', { msg: e.target.value, room: props.match.params.rid })
        e.target.value = ""
    }

    const share = (data) => {
        socket.emit('share', { people: data, from: localStorage.getItem("id"), room: props.match.params.rid }, ()=>{
            console.log("done!");
        })
    }

    // if(document.querySelector("#collapse-musely").checked === true){
    //     console.log("True")
    // }

    return (
        <>
            <Navbar props={props} />
            <div>
                <div id="messenger-musly" className="white-text"></div>
                <div className="game-chat musly-chat museDown" style={{height: '100%', width: '350px', float:'right'}}>
                    <div className="card blue-grey darken-1" style={{height: '90%', borderRadius: "12px"}}>
                        <div className="card-content white-text" style={{height: '90%'}}>
                            <span className="card-title" id="word">
                                <div className="switch">
                                    <label>
                                        Collapse
                                    <input type="checkbox"  id="collapse-musely" onChange={(e)=>{
                                        if(e.target.checked){
                                            document.querySelector(".musly-chat").classList.remove("museDown");
                                            document.querySelector(".musly-editor").classList.remove("museDown");
                                        }else{
                                            document.querySelector(".musly-chat").classList.add("museDown");
                                            document.querySelector(".musly-editor").classList.add("museDown");
                                        }
                                    }}/>
                                    <span className="lever"></span>
                                        Expand
                                    </label>
                                </div>
                            </span>
                            
                            <ul id="gc" style={{height: "75%" ,overflowY: "scroll"}}>
                                
                            </ul>
                            <div className="game-editor musly-editor museDown">
                                <div className="input-field" style={{margin:0}}>
                                    <input type="text" name="message" id="message" 
                                    placeholder="Guess the word..." className="white-text"
                                    onKeyPress={e => e.key === 'Enter' ? sendMsg(e) : null }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            {
                                sessionStorage.getItem('game') ? (
                                        <>
                                            <a href="#" id="start" onClick={()=>{
                                                socket.emit('start', { room: props.match.params.rid });
                                                document.querySelector("#start").style.display = "none";
                                                document.querySelector("#share").style.display = "none";
                                                document.querySelector("#leave").style.display = "inline-block";
                                                document.querySelector("#next").style.display = "inline-block";
                                            }} >Start</a>
                                            <a href="#" id="next" style={{display: "none"}} onClick={()=>{
                                                socket.emit('start', { room: props.match.params.rid });
                                            }}>Next</a>
                                            <Link to="/game/online" id="leave" style={{display: "none", color: "#ee6e6e"}}>Leave</Link>
                                        </>
                                    ) : (
                                        <Link to="/game/online" id="leave" style={{display: "none", color: "#ee6e6e"}}>Leave</Link>
                                    )
                            }
                            <a href="#" id="share" className="modal-trigger" data-target="modal3">Share</a>
                            <AvatarGroup max={4} className="right" style={{position: "relative",top: "-5px"}}>
                                {
                                    people ? people.map(ele=>{
                                        return(
                                            <Avatar style={{height: "30px", width: "30px"}} >{ele[0]}</Avatar>
                                        )
                                    }) : null
                                }
                            </AvatarGroup>
                        </div>
                    </div>
                </div>
                <Share share={share}/>

            </div>
        </>
    )
}

export default Musly
