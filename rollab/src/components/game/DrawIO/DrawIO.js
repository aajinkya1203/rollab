import React, { useEffect, useState } from 'react'
import './style.css';
import { animateScroll } from 'react-scroll';
import socketIOClient from 'socket.io-client'; 
import Navbar from '../../layout/Header';
import { Avatar } from '@material-ui/core';
import M from 'materialize-css';
import { AvatarGroup } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import Share from '../../popups/Share';
import './Palette.scss';

var socket;


const DrawIO = (props) => {
    var canvas;
    var colors;
    var context;
    const ENDPOINT = "http://localhost:1000";
    const [people, setPeople] = useState([JSON.parse(localStorage.getItem("user")).name]);
    const [word, setWord] = useState("");
    var current = {
        color: 'black'
    };
    var drawing = false;

    useEffect(()=>{
        window.$('.modal').modal();
        canvas = document.getElementsByClassName('whiteboard')[0];
        colors = document.getElementsByClassName('cy');
        context = canvas.getContext('2d');
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
            animateScroll.scrollToBottom({
                containerId: "notifi"
            })
        })
        animateScroll.scrollToTop();
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
        
        //Touch support for mobile devices
        canvas.addEventListener('touchstart', onMouseDown, false);
        canvas.addEventListener('touchend', onMouseUp, false);
        canvas.addEventListener('touchcancel', onMouseUp, false);
        canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);
    
        for (var i = 0; i < colors.length; i++){
            colors[i].addEventListener('click', onColorUpdate, false);
        }
    
        socket.on('drawing', onDrawingEvent);

        socket.on('allParticipants', (data)=>{
            setPeople(data);
        })
    
        window.addEventListener('resize', onResize, false);
        onResize();
        socket.on('announce', (data)=>{
            M.toast({ html: data });
        })

        socket.emit('joinGame', { from: localStorage.getItem('id'), room: props.match.params.rid }, (resp)=>{
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
            }
            animateScroll.scrollToBottom({
                containerId: "gc"
            });  
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
            }
            animateScroll.scrollToBottom({
                containerId: "gc"
            });   
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
            }
            animateScroll.scrollToBottom({
                containerId: "gc"
            });  
        });

        socket.on('nextWord', (data)=>{
            setWord(data);
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
        
        return ()=>{
            //leaving from ze games
            socket.emit('leaveDrawio', { from: localStorage.getItem('id'), room: props.match.params.rid }, (resp)=>{
                console.log(resp);
            })
            // disconnecting this when it unmounts
            console.log("Dismounting");
            socket.emit('disconnect');
            // disposing instance of the socket var
            socket.off();
        }
    },[]);


    function drawLine(x0, y0, x1, y1, color, emit){
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        if (!emit) { return; }
        var w = canvas.width;
        var h = canvas.height;

        socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
        room: props.match.params.rid
        });
    }

    function onMouseDown(e){
        drawing = true;
        try{
            current.x = e.clientX||e.touches[0].clientX;
            current.y = e.clientY||e.touches[0].clientY;
        }catch(err){
            console.log("Out of frame!")
        }
    }

    function onMouseUp(e){
        if (!drawing) { return; }
        drawing = false;
        try{
            drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
        }catch(err){
            console.log("Out of frame!")
        }
    }

    function onMouseMove(e){
        if (!drawing) { return; }
        try{
            drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
            current.x = e.clientX||e.touches[0].clientX;
            current.y = e.clientY||e.touches[0].clientY;
        }catch(err){
            console.log("Out of frame!")
        }
    }

    function onColorUpdate(e){
        current.color = e.target.className.split(' ')[1];
    }
    const sendMsg = (e) => {
        socket.emit('gameChat', { msg: e.target.value, room: props.match.params.rid })
        e.target.value = ""
    }

    // limit the number of events per second
    function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
        var time = new Date().getTime();

        if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
        }
        };
    }

    const share = (data) => {
        console.log("Share called")
        socket.emit('share', { people: data, from: localStorage.getItem("id"), room: props.match.params.rid }, ()=>{
            console.log("done!");
        })
    }

    function onDrawingEvent(data){
        var w = canvas.width;
        var h = canvas.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    // make the canvas fill its parent
    function onResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    return (
        <>
        <Navbar props={props} />
            <div id="games" className="row" style={{marginBottom: 0}}>

                    <canvas className="whiteboard" ></canvas>
                    

                    <div className="colors">
                        <div className="color"><div className="cy black"></div>
                        <div className="color"><div className="cy red"></div>
                        <div className="color"><div className="cy green"></div>
                        <div className="color"><div className="cy blue"></div>
                        <div className="color"><div className="cy yellow"></div></div>
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>


                <div className="game-chaty" style={{height: '100%', width: '350px', float:'right'}}>
                    <div className="card blue-grey darken-1" style={{height: '90%', borderRadius: "12px"}}>
                        <div className="card-content white-text" style={{height: '90%'}}>
                            {
                                sessionStorage.getItem("game") ? (
                                    <span className="card-title" id="word">Word: {word}<i className="material-icons  right">equalizer</i></span>
                                    ) : (
                                    <span className="card-title" id="word">Word: {word.length}<i className="material-icons  right">equalizer</i></span>
                                )
                            }
                            
                            <ul id="gc" style={{height: "75%" ,overflowY: "scroll"}}>
                                
                            </ul>
                            <div className="game-editor">
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

export default DrawIO
