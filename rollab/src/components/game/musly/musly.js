import React, { useEffect, useState } from 'react';
import './musly.css';
import M from 'materialize-css';
import socketIOClient from 'socket.io-client'; 
import Navbar from '../../layout/Header';
import Share from '../../popups/Share';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';


var socket;

var messenger;
var counter = 0;
console.log("counter:", counter);
const Musly = (props) => {
    const ENDPOINT = "http://localhost:1000";
    const [people, setPeople] = useState([JSON.parse(localStorage.getItem("user")).name]);

    useEffect(()=>{
        window.$('.modal').modal();
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log("Connected");
            socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
        });
        socket.on('comm', (data)=>{
            let yout = `
            <blockquote class="valign-wrapper notif-notif">
                <span class="material-icons">
                    notification_important
                </span>
                ${data.sender.name} has sent you a message
            </blockquote>
            `;
            document.querySelector('#notif-logs').innerHTML += yout;
            document.querySelector("#rFAB").classList.add("pulse");
        });

        socket.on('allParticipants', (data)=>{
            setPeople(data);
        });

        socket.emit('joinGameMusly', { from: localStorage.getItem('id'), room: props.match.params.mid }, (resp)=>{
            console.log(resp);
            if(resp==609){
                M.toast({ html: "Invalid game code!" });
                props.history.push('/game/online');
            }else if(resp == 414){
                M.toast({ html: "Game in progress!" });
                props.history.push('/game/online');
            }
        });

        socket.on('deleteGame', (data)=>{
            M.toast({ html: data.data });
            props.history.push('/game/online');
        });

        
        socket.on('gameChatMusly', (data)=>{
          let a = `
          <div key=${Math.random()} style="margin-top:10px">
              <div class="left-align User">
                  ${data.name}
              </div>
              <div class="message" style='background: #2d3034;
                  padding: 10px;
                  border-radius: 12px 12px 12px 0;
                  width: fit-content;'
              >
                  ${data.msg}
              </div>
          </div>`;
          if(document.querySelector("#gc")){
              document.querySelector("#gc").innerHTML += a;
              animateScroll.scrollToBottom({
                    containerId: "gc"
                });  
          }
      });

      socket.on('gameChat', (data)=>{
        let a = `
        <div key=${Math.random()} style="margin-top:10px">
            <div class="left-align User">
                ${data.name}
            </div>
            <div class="message" style='background: #2d3034;
                padding: 10px;
                border-radius: 12px 12px 12px 0;
                width: fit-content;'
            >
                ${data.msg}
            </div>
        </div>`;
        if(document.querySelector("#gc")){
            document.querySelector("#gc").innerHTML += a;
            animateScroll.scrollToBottom({
                containerId: "gc"
            });  
        }
    });


      socket.on('success', (data)=>{
          let a = `
          <fieldset style='color:#93ee6e; border-color:#93ee6e'>
              <legend style='padding:0 10px'>
                  ${data}
              </legend>
          </fieldset>
          `;
          if(document.querySelector("#gc")){
              document.querySelector("#gc").innerHTML += a;
              animateScroll.scrollToBottom({
                containerId: "gc"
            });  
    
          }
      });

      socket.on('fail', (data)=>{
          let a = `
          <fieldset style='color:#ee6e6e; border-color:#ee6e6e'>
              <legend style='padding:0 10px'>
                  ${data}
              </legend>
          </fieldset>
          `;
          if(document.querySelector("#gc")){
              document.querySelector("#gc").innerHTML += a;
              animateScroll.scrollToBottom({
                containerId: "gc"
            });  
    
          }
      });

      socket.on('announce', (data)=>{
          M.toast({ html: data });
      })

      socket.on('nextWord', (data)=>{
        messenger.addElement(data);
    })
    
    socket.on('animateMusly', ()=>{
        setTimeout(messenger.animateIn, 5000);
    })
      socket.on('invitation', data=>{
          let yout = `
          <blockquote class="valign-wrapper invi-notif">
              <span class="material-icons">
                  notification_important
              </span>
              ${data}
          </blockquote>
          `;
          document.querySelector('#notif-logs').innerHTML += yout;
          document.querySelector("#rFAB").classList.add("pulse");
          animateScroll.scrollToBottom({
              containerId: "notifi"
          })
      })
      


        var Messenger = function(el){
            'use strict';
            var m = this;
            
            m.init = function(){
              m.codeletters = "&#*+%?£@§$";
              m.message = 0;
              m.current_length = 0;
              m.fadeBuffer = false;
              m.answer=[];
              m.messages = [
                'Musly - guess the song through the lyrics',
                'You got 10s to guess the answer and only 5 rounds!',
                'Aight, lets begin. Goodluck!',
              ];
              m.counter = 0;
              
            };
            
            m.generateRandomString = function(length){
              var random_text = '';
              while(random_text.length < length){
                random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
              } 
              
              return random_text;
            };

            m.getCorrect = function(){
                return m.answer[counter-4];
            }

            m.addElement = function(a){
                m.messages.push(a.lyric);
                m.answer.push(a.song);
            }
            
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
                  counter += 1;
                  if(counter > 7){
                      console.log("above")
                  }else{
                    console.log("Counter", counter)
                    if(sessionStorage.getItem('game') && counter>=3 ){
                        socket.emit('startMusly', { room: props.match.params.mid }, (data)=>{
                            // do nothing
                        });
                    }
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
              
              console.log("here")
              setTimeout(m.animateIn, 200);
            };
            
            m.init();
          }
          
          console.clear();
          messenger = new Messenger(window.$('#messenger-musly'));
          return()=>{
              counter = 0;
            socket.emit('leaveMusly', { from: localStorage.getItem('id'), room: props.match.params.mid }, (resp)=>{
                console.log(resp);
                // disconnecting this when it unmounts
                console.log("Dismounting");
                socket.emit('disconnect');
                // disposing instance of the socket var
                socket.off();
            })
          }
    }, []);
    const sendMsg = (e) => {
        if(e.target.value.substring(0, 3) === "/a-"){
            socket.emit('gameChatMuslyCheck', { msg: e.target.value, room: props.match.params.mid, compare: messenger.getCorrect() })
        }else{
            socket.emit('gameChatMusly', { msg: e.target.value, room: props.match.params.mid })
        }
        e.target.value = ""
    }

    const share = (data) => {
        socket.emit('shared', { people: data, from: localStorage.getItem("id"), room: props.match.params.mid }, ()=>{
            console.log("done!");
        })
    }

    // if(document.querySelector("#collapse-musely").checked === true){
    //     console.log("True")
    // }

    return (
        <>
            <Navbar props={props} />
            <div id="musly-wrapper" style={{height: "100%", backgroundColor: "#23272a"}}>
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
                        <div className="card-action game-action">
                            {
                                sessionStorage.getItem('game') ? (
                                        <>
                                            <a href="#" id="start" onClick={()=>{
                                                socket.emit('animateMusly', { room: props.match.params.mid });
                                                document.querySelector("#start").style.display = "none";
                                                document.querySelector("#share").style.display = "none";
                                                document.querySelector("#leave").style.display = "inline-block";
                                            }} >Start</a>
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
