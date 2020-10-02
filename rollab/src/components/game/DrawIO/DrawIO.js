import React, { useEffect, useState } from 'react'
import './style.css';
import socketIOClient from 'socket.io-client'; 
import Navbar from '../../layout/Header';
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';


var socket;


const DrawIO = (props) => {
    var canvas;
    var colors;
    var context;
    const ENDPOINT = "http://localhost:1000";
    const [people, setPeople] = useState([{name:"Aajinkya"}, {name:"NotAajinkya"}, {name:"TestAajinkya"},]);

    var current = {
        color: 'black'
    };
    var drawing = false;

    useEffect(()=>{
        canvas = document.getElementsByClassName('whiteboard')[0];
        colors = document.getElementsByClassName('color');
        context = canvas.getContext('2d');
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log("Connected");
            socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
        });
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
    
        window.addEventListener('resize', onResize, false);
        onResize();
        socket.on('announce', (data)=>{
            console.log(data)
        })

        socket.emit('joinGame', { from: localStorage.getItem('id'), room: props.match.params.rid }, (resp)=>{
            console.log(resp);
        });

        socket.on('deleteGame', (data)=>{
            console.log(data);
            props.history.push('/game/online');
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
        color: color
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
            <div id="games" classNameName="row">
                {/* <Sidebar /> */}
                <div>
                    <canvas className="whiteboard" ></canvas>

                    <div className="colors">
                        <div className="color black"></div>
                        <div className="color red"></div>
                        <div className="color green"></div>
                        <div className="color blue"></div>
                        <div className="color yellow"></div>
                    </div>

                </div>
                <div className="game-chat" style={{height: '100%', width: '350px', float:'right'}}>
                    <div className="card blue-grey darken-1" style={{height: '90%', borderRadius: "12px"}}>
                        <div className="card-content white-text" style={{height: '90%'}}>
                            <span className="card-title">Bottle</span>
                            <ul style={{height: "75%" ,overflowY: "scroll"}}>
                                
                                <div className="" key={Math.random()} style={{marginTop:"10px"}}>
                                    <div className="left-align User">
                                        <i></i>Aajinkya
                                    </div>
                                    <div className="message" style={{background: "#2d3034",
                                        padding: '10px',
                                        borderRadius: "12px 12px 12px 0",
                                        width: "fit-content"}}
                                    >
                                        Bottle
                                    </div>
                                </div>

                                <div className="" key={Math.random()} style={{marginTop:"10px"}}>
                                    <div className="left-align User">
                                        Aajinkya
                                    </div>
                                    <div className="message" style={{background: "#2d3034",
                                        padding: '10px',
                                        borderRadius: "12px 12px 12px 0",
                                        width: "fit-content"}}
                                    >
                                        Bottle
                                    </div>
                                </div>

                                <div className="" key={Math.random()} style={{marginTop:"10px"}}>
                                    <div className="left-align User">
                                        <i></i>Aajinkya
                                    </div>
                                    <div className="message" style={{background: "#2d3034",
                                        padding: '10px',
                                        borderRadius: "12px 12px 12px 0",
                                        width: "fit-content"}}
                                    >
                                        Bottle
                                    </div>
                                </div>

                                <div className="" key={Math.random()} style={{marginTop:"10px"}}>
                                    <div className="left-align User">
                                        <i></i>Aajinkya
                                    </div>
                                    <div className="message" style={{background: "#2d3034",
                                        padding: '10px',
                                        borderRadius: "12px 12px 12px 0",
                                        width: "fit-content"}}
                                    >
                                        Bottle
                                    </div>
                                </div>

                                <div className="" key={Math.random()} style={{marginTop:"10px"}}>
                                    <div className="left-align User">
                                        <i>Aajinkya</i>
                                    </div>
                                    <div className="message" style={{background: "#2d3034",
                                        padding: '10px',
                                        borderRadius: "12px 12px 12px 0",
                                        width: "fit-content"}}
                                    >
                                        Bottle
                                    </div>
                                </div>

                                <div className="" key={Math.random()} style={{marginTop:"10px"}}>
                                    <div className="left-align User">
                                        <i></i>Aajinkya
                                    </div>
                                    <div className="message" style={{background: "#2d3034",
                                        padding: '10px',
                                        borderRadius: "12px 12px 12px 0",
                                        width: "fit-content"}}
                                    >
                                        Bottle
                                    </div>
                                </div>
                            </ul>
                            <div className="game-editor">
                                <div className="input-field" style={{margin:0}}>
                                    <input type="text" name="message" id="message" 
                                    placeholder="Guess the word..."
                                    onKeyPress={e => e.key === 'Enter' ? null: null }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <a href="#" id="start" onClick={()=>{
                                document.querySelector("#start").style.display = "none";
                                document.querySelector("#leave").style.display = "inline-block";
                            }} >Start</a>
                            <a href="#" id="leave" style={{display: "none", color: "red"}}>Leave</a>
                            <a href="#">Share</a>
                            <AvatarGroup max={4} className="right" style={{position: "relative",top: "-5px"}}>
                                    {
                                        people ? people.map(ele=>{
                                            return(
                                                <Avatar style={{height: "30px", width: "30px"}} >{ele.name[0]}</Avatar>
                                            )
                                        }) : null
                                    }
                                    </AvatarGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DrawIO
