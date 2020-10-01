import React, { useEffect } from 'react'
import './style.css';
import socketIOClient from 'socket.io-client'; 
import Navbar from '../../layout/Header';

var socket;


const DrawIO = (props) => {
    var canvas;
    var colors;
    var context;
    const ENDPOINT = "http://localhost:1000";

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
            // socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
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
        return ()=>{
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
            <div id="stati" className="row">
                {/* <Sidebar /> */}
                <div>
                    <canvas class="whiteboard" ></canvas>

                    <div class="colors">
                        <div class="color black"></div>
                        <div class="color red"></div>
                        <div class="color green"></div>
                        <div class="color blue"></div>
                        <div class="color yellow"></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DrawIO
