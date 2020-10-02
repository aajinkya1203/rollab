import React, { useEffect } from 'react';
import './Invite.css';
import { gsap, Linear, Power1, Elastic, Bounce } from 'gsap';


const Invite = () => {
    useEffect(()=>{
        var cloudOne = gsap.timeline({repeat: -1, delay: -12});
        cloudOne.to("#cloud-one", 36, {x: "-720px", ease: Linear.easeNone});

        var cloudTwo = gsap.timeline({repeat: -1, delay: -3});
        cloudTwo.to("#cloud-two", 24, {x: "-720px", ease: Linear.easeNone});

        var cloudFour = gsap.timeline({repeat: -1, delay: 4});
        cloudFour.to("#cloud-four", 33, {x: "-720px", ease: Linear.easeNone});

        var cloudFive = gsap.timeline({repeat: -1});
        cloudFive.to("#cloud-five", 24, {x: "-720px", ease: Linear.easeNone});

        window.$("#game-code").focus(function(){
        if(window.$("#game-code").val() == ""){
            window.$("#placeholdery").fadeToggle();
        }
        });
        window.$("#game-code").focusout(function(){
        if(window.$("#game-code").val() == ""){
            window.$("#placeholdery").fadeToggle();
        }
        });

        window.$("#btny").mouseenter(function(){
        gsap.to("#btnSVG", .3, {fill: "#d85168"});
        });
        window.$("#btny").mouseleave(function(){
        gsap.to("#btnSVG", .3, {fill: "#e96f8c"});
        });

        window.$("#game-code").on("keypress", function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            window.$("#btny").click();
        }
        });

        gsap.set("#mail", {scale: 0, x: 20, transformOrigin: "right"});

        window.$("#btny").click(function() {
        var submit = gsap.timeline();
            submit.to("#title-code, #disclaimer, #btny, #game-code, #placeholdery", {opacity: 0, pointerEvents: "none", ease: Power1.easeInOut});
            submit.to("#inputSVG, #btnSVG", .5, {morphSVG:{shape:"#invisible-heart"}, ease: Power1.easeInOut});
            submit.to("#inputSVG, #btnSVG", .5, {y: -30, ease: Power1.easeInOut});
            submit.to("#successier", .5, {delay: -.5, opacity: 1, ease: Power1.easeInOut});
        
        var mailbox = gsap.timeline();
            mailbox.to({}, 1, {});
            mailbox.to("#mailbox-stick", 3, {rotate: -90, x: 15, transformOrigin: "left", ease: Elastic.easeOut});
            mailbox.to("#cover-closed", 1, {delay: -3, y: -1, rotation:-180, transformOrigin: "bottom", ease: "Bounce.easeOut"});
            mailbox.to("#cover-open-side", .15, {delay: -2, opacity: 0});
            mailbox.to("#heart", .15, {delay: -3, opacity: 0});
            mailbox.to("#mail", 0, {delay: -3, opacity: 1, display: "block"});
            mailbox.to("#mail", 1, {delay: -3, scale: 1, x: 0, transformOrigin: "right", ease: "back.out"});
        
        var wrapper = gsap.timeline({delay: 3});
            wrapper.to("#svgWrapper", 1, {scale: .8, ease: Bounce.easeOut});
            wrapper.to("#svgWrapper", 1, {delay: -.6, x: "-200%", rotate: 9, ease: Power1.easeIn});
            wrapper.to("#title-code, #disclaimer, #btny, #game-code, #placeholdery", 0, {opacity: 1, pointerEvents: "all"});
            wrapper.to("#inputSVG", 0, {morphSVG: {shape:"#inputSVG"}, y: 0});
            wrapper.to("#btnSVG", 0, {morphSVG: {shape:"#btnSVG"}, y: 0});
            wrapper.to("#successier", 0, {opacity: 0});
            wrapper.to("#mailbox-stick", 0, {rotate: 0, x: 0, transformOrigin: "left"});
            wrapper.to("#cover-closed", 0, {rotation: 0, y: 0, transformOrigin: "bottom"});
            wrapper.to("#cover-open-side", 0, {opacity: 1});
            wrapper.to("#heart", 0, {opacity: 1});
            wrapper.to("#mail", 0, {opacity: 0, scale: 0, x: 0, transformOrigin: "right", display: "none"});
            wrapper.to("#svgWrapper", 0, {x: "200%"});
            wrapper.to("#svgWrapper", 1.5, {x: "0", rotate: -9, ease: "back.out"});
            wrapper.to("#svgWrapper", 1, {delay: -.5, rotate: 0, scale: 1, ease: Bounce.easeOut});
        });
    })
    return (
        <div className="invi">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="https://kit.fontawesome.com/bf5ba39767.js" crossOrigin="anonymous"></script>

            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"/> 
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"/> 

            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

            <div id="svgWrapper">
            <svg version="1.1" id="mailboxSVG" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 370.1 370.4" style={{enableBackground:"new 0 0 370.1 370.4"}} xmlSpace="preserve">
            <g id="Capa_9">
                <rect className="st0" width="370.4" height="258.6"/>
            </g>
            <g id="buildings">
                <polygon className="st1" points="370.4,247.3 370.4,204.8 330.5,204.8 330.5,191.8 311.5,191.8 311.5,168.2 293.5,152.7 275.7,167.8 
                    275.7,212.5 263.8,212.5 263.8,205.2 255.5,205.2 255.5,177.8 239.5,177.8 239.5,205.2 231.2,205.2 231.2,210.5 213.2,210.5 
                    213.2,221.4 193.4,221.4 193.4,207.5 176.8,193.8 159.3,208.8 159.3,219.3 147.9,219.3 147.9,192.7 130.8,177.8 129.9,177.8 
                    112.8,192.7 112.8,219.3 106,219.3 106,206.4 91.6,206.4 91.6,219.3 71.7,219.3 71.7,213.5 54.3,198.5 53.4,198.5 38.3,211.4 
                    38.3,199 26.9,199 26.9,192.7 12.4,192.7 12.4,219.3 0,219.3 0,359 370.4,359 	"/>
            </g>
            <g id="post">
                <rect x="180.3" y="162.9" className="st2" width="9.8" height="207.5"/>
                <polyline className="st3" points="190.1,191.4 180.3,191.4 180.3,162.9 190.1,162.9 	"/>
                <path className="st4" d="M288.5,300.3c0-3.4-2.8-6.2-6.2-6.2H80.3c-3.4,0-6.2,2.8-6.2,6.2v20.8c0,3.4,2.8,6.2,6.2,6.2h202.1
                    c3.4,0,6.2-2.8,6.2-6.2V300.3z"/>
            </g>
            <g id="clouds">
                <g>
                    <g id="cloud-five">
                        <path className="st5" d="M392.4,128.4c0,0-2-9.1,9.4-12.4c0,0,8.2-2.5,12.9,5.7c0,0,2.9,3.7,1.1,8.4c0,0,3.4-4.6,7.7-2
                            c0,0,3.6,2.2,2.6,6.5c0,0,2.3-2.9,5.8-2c0,0,4.1,1,3.7,4.9c0,0,0.3,4.1-4.1,3.3c0,0,0.5,4.2-4.4,5.4c0,0-4.9,1.1-7.1-2.6
                            c0,0,0,5.8-6.3,5.9c0,0-3.7,0.5-6.5-4.4c0,0-3.7,6.9-9.5,5.7c0,0-6.5,0.3-8.6-5.8c0,0-8.4,3.8-11.3-3.2c0,0-6.1,0.9-5.3-4.2
                            c0,0,1.1-5.9,8-3c0,0-1.1-5.4,3.7-7.4c0,0,4.1-2.5,8,1.6L392.4,128.4z"/>
                        <path className="st6" d="M406,146.9c-9.8,6.5-15.3-6.4-15.3-6.4c-7,3.3-9.6-0.7-9.6-0.7c-3.2,2.5-6.1-0.1-6.1-0.1
                            c-2.8-1.5-0.9-4.6-0.9-4.6l-0.1-0.1c-1.3,1.1-1.6,2.8-1.6,2.8c-0.8,5.1,5.3,4.2,5.3,4.2c2.9,7,11.3,3.2,11.3,3.2
                            c2.1,6.1,8.6,5.8,8.6,5.8c3.9,0.8,6.8-2,8.3-3.9L406,146.9z"/>
                        <path className="st6" d="M413.6,149.7c6.3-0.1,6.3-5.9,6.3-5.9c2.2,3.7,7.1,2.6,7.1,2.6c4.9-1.2,4.4-5.4,4.4-5.4
                            c4.4,0.8,4.1-3.3,4.1-3.3c0.1-0.7,0-1.7-0.2-2.2c-1.2,5-4.9,4.6-4.9,4.6l-0.2,0.4c-4.7,7.7-10.3,0.3-10.3,0.3
                            c-5.5,7.8-10.7,1.1-10.7,1.1l-2.1,3.5C409.9,150.3,413.6,149.7,413.6,149.7z"/>
                        <path className="st6" d="M408.9,140.1c-7.1,12.1-18.2,1.1-18.2,1.1l-0.1,6.4c2.4,3.7,7,3.7,7,3.7c5.8,1.2,9.6-6.2,9.6-6.2
                            c0.6,1.1,1.2,1.9,1.9,2.5c0.2-1.1,2.7-3.1,2.7-3.1C409.4,144,408.9,140.1,408.9,140.1z"/>
                        <path className="st6" d="M385.8,138.3c0,0,3.4,5.1,10,0.7C395.8,139,389.5,141.3,385.8,138.3z"/>
                        <path className="st6" d="M401.9,132.9c0,0,8,5.6,13.9-3.2C415.7,129.7,412.5,143.6,401.9,132.9z"/>
                    </g>
                    <g id="cloud-four">
                        <path className="st5" d="M547,113.7c-0.3-5.7-5.7-8.2-5.7-8.2c-7.3-3.6-11.2,2.1-11.2,2.1c1.1-7.3-5.7-11-5.7-11
                            c-7.4-5.9-14.1-0.3-14.1-0.3c1.6-4.6-1.8-6.1-1.8-6.1c-5-2.4-6.9,1.2-6.9,1.2c-2.5-11.9-12-12.8-12-12.8
                            c-20.4-1.7-19.8,15-19.8,15s-3.6-2.4-6.3,0.9c0,0-2.6,2.4,0.8,3.8c0,0-11.5-2-13.3,6.7c0,0-1.7,6.3,6.7,6.7c0,0-7.8,2.8-4.9,9.8
                            c0,0,2.6,4.4,8.2,0.9c0,0,1.6,4.5,8.4,5c0,0,5.4,0.3,8.2-4.5c0,0,3.6,7.9,12.4,7.4c0,0,8.2,0,10-7.8c0,0,0.8,4.6,5.1,4.7
                            c0,0,3.6,1.1,5-3.4c0,0,5.5,7.1,11.9,5.1c0,0,6.9-0.8,7.4-7c0,0,1.7,3.2,5.9,3.4c0,0,2.5,0.1,4-2.4c0,0,2.2,4,6.7,3.2
                            c0,0,3.8-1.2,4.7-4.4c0,0,5.3,2.2,6.1-3.2c0,0,0.5-6.7-5.5-7.1c0,0-2.2-0.7-3.8,1.3L547,113.7z"/>
                        <path className="st6" d="M510.6,121.7c-1.9,4.5-6.3,3.6-6.3,3.6c-4.1-0.3-4.1-5.1-4.1-5.1l-0.3,1c-2.7,5.3-9.6,5.8-9.6,5.8
                            c-6.1,0.7-8-4.7-9.2-7.3c-0.6-1.3-1.6-0.6-1.6-0.6c-2.4,3.8-8,4.1-8,4.1c-6.4,1.5-9.8-3.4-9.8-3.4c-3.3,2.9-5.7,0.3-5.7,0.3
                            c-3.1-3.3,0.6-7.3,0.6-7.3l-0.2,0.1c-2.1,1.2-5.7,4-3.6,9.1c0,0,2.6,4.4,8.2,0.9c0,0,1.6,4.5,8.4,5c0,0,5.4,0.3,8.2-4.5
                            c0,0,3.6,7.9,12.4,7.4c0,0,8.2,0,10-7.8c0,0,0.8,4.6,5.1,4.7c0,0,3.5,1,5-3.4L510.6,121.7z"/>
                        <path className="st6" d="M556.9,119c0,0,0-0.3,0-0.8c0-0.1-0.1-0.1-0.1-0.1c-0.8,4.3-6.2,3.1-6.2,3.1c-6.2,8.2-10.9,0-10.9,0
                            c-6.8,7.1-10.5-0.8-10.5-0.8c-8.2,13.2-18.7,1.3-18.7,1.3l-0.9,3.7c0.2-0.3,0.4-0.7,0.5-1.2c0,0,5.7,7.6,12,5.6
                            c0,0,6.5-0.6,7.1-6.8c0,0,1.3,3.3,6.1,2.8c0,0,2.5,0.1,4-2.4c0,0,2.2,4,6.7,3.2c0,0,3.8-1.2,4.7-4.4
                            C550.8,122.2,556.1,124.4,556.9,119z"/>
                        <path className="st6" d="M518.3,111.2c0,0,4.5-6.9,9.9-0.8c0,0,0.3-1.7,2.1-3.2c0,0-1.4,2.5-1.6,4.8
                            C528.8,112,523.5,105.4,518.3,111.2z"/>
                        <path className="st6" d="M470.4,115.1c0,0,7.4,9.9,17.5,2.3C488,117.4,478.6,121,470.4,115.1z"/>
                        <path className="st6" d="M481.9,105.8c0,0,4.2,7,10.8,1.7c0,0,6.6,10,15.5-1.6c0,0-8.4,9.5-15.4-0.7
                            C492.7,105.2,488.7,109.7,481.9,105.8z"/>
                        <path className="st6" d="M463.6,98.6c0,0,5.1,4.7,7.8-0.4c0,0-2,8.1-9.4,0.1C461.9,98.3,462.9,98.2,463.6,98.6z"/>
                    </g>
                    <g id="cloud-three">
                        <path className="st5" d="M375.9,104.7c0,0-4.1-2.2-1.1-5.3c0,0,2.9-3.2,5.9-0.1c0,0,0.7-9,9.5-9c0,0,5.9,1.1,6.9,7.9
                            c0,0,4.9-2.9,7.3,2.6c0,0,1.1,2.2-1.6,2.8L375.9,104.7z"/>
                        <path className="st6" d="M374,102.8c0.6,1.2,1.9,1.9,1.9,1.9l26.9-1.1c2.6-0.5,1.6-2.8,1.6-2.8c-2.8,1.6-12.1,1.6-12.1,1.6
                            C378.9,104.6,375.1,103.6,374,102.8z"/>
                    </g>
                    <g id="cloud-two">
                        <path className="st5" d="M380.3,22.5c0,0-6.6,4-8.2-2.1c0,0-0.9-8.2,9.3-7.4c0,0,0.5-5.7,7.3-5.9c0,0,7.9-0.8,9.8,7.3
                            c0,0,6.2-5.9,10.4,1.4c0,0,2.8,6.2-3.3,8.5c0,0-4.6,1.6-6.6-1.7c0,0-1.9,5.5-6.5,5.1c0,0-5.4,0.5-5.7-4.6c0,0,0,2.4-3.2,2.7
                            C383.6,25.8,379.6,25.7,380.3,22.5z"/>
                        <path className="st6" d="M404.7,22.5c-3.8,1.4-5.5-1.7-5.5-1.7c-2.5,4-7.5,3.9-7.5,3.9c-3.6,0.3-4.7-3.1-4.7-3.1
                            c-0.9,3.8-5.1,2.5-5.1,2.5c-2-0.9-0.9-3.8-0.9-3.8c-0.9,0.6-3.8,1.4-3.8,1.4c-4.3,1.3-5-3-5-3l-0.1,0c-0.1,1-0.1,1.7-0.1,1.7
                            c1.6,6,8.2,2.1,8.2,2.1c-0.6,3.2,3.3,3.3,3.3,3.3c3.2-0.3,3.2-2.7,3.2-2.7c0.3,5.1,5.7,4.6,5.7,4.6c4.6,0.5,6.5-5.1,6.5-5.1
                            c2.1,3.3,6.6,1.7,6.6,1.7c3.4-1.3,4.1-3.8,4-5.8c0,0-0.1,0-0.1,0C408.2,22,404.7,22.5,404.7,22.5z"/>
                    </g>
                    <g id="cloud-one">
                        <path className="st5" d="M443.2,72.9c0,4.2-4.7,8.7-10.1,8.7c-4,0-7.4-1.8-9-4.5c-1.7,3.2-6,5.4-11,5.4c-6.5,0-11.7-3.7-11.7-8.3
                            c0,0,0.8,11-11.3,9.5c0,0-10-0.8-10.7-6.9c0,0-1.5-3.8,3.8-6.7c0,0-10.1,2.9-10.8-4.1c0,0-0.2-3.7,2.2-5.6c0,0,3-2.7,7.4-1
                            c0,0-4.2-6.3,2.1-10.3c0,0,4.7-3.7,10,1.1c0,0-0.5-7.9,8.7-7.7c0,0-1.6-9.2,9.2-11.6c0,0,7.1-1.8,10.6,6.6c0,0,6.6-6.9,14.8-1.8
                            c0,0,4.2,2.4,4.5,8.2c0,0,6.6-5.4,13.2-1.4c0,0,4.6,2.5,3.1,9.3c0,0,7.4-1.6,9.2,7.1c0,0,8.2-5.8,12.1,3.7c0,0,1.6-4.5,7.9-3.7
                            c0,0,4.7,1.6,5.8,5.8c0,0,0.9-2.1,4.1-2c0,0,3.2-0.1,3.8,3.3c0,0-0.1,4-5.5,3.7c0,0-2-0.7-2.2-1.2c-0.3-0.5-0.3-0.5-0.3-0.5
                            s0.3,5.7-6.2,7c0,0-7,0.8-8.6-3c0,0-1.6,6.2-8.6,5.4c0,0-6.7,0.4-8.3-5.8c-0.7,4-4.7,7-9.5,7c0,0-3.8,0.7-6.2-2.2L443.2,72.9z"/>
                        <path className="st6" d="M461.6,71.5c1.6,6.2,8.3,5.8,8.3,5.8c7,0.8,8.6-5.4,8.6-5.4c1.6,3.8,8.6,3,8.6,3c6.5-1.3,6.2-7,6.2-7
                            s0,0,0.3,0.5c0.3,0.5,2.2,1.2,2.2,1.2c5.4,0.3,5.5-3.7,5.5-3.7c0-0.1-0.1-0.2-0.1-0.4c-3.9,5.5-8,0.6-8,0.6
                            c-6.6,9.3-17.2,4-17.2,4c-3.5,3.6-9.3,1.8-9.3,1.8c-6.1-0.8-7-4-7-4c-3.2,3.4-7.3,4-7.3,4c-7.7,2-12.3-4.6-12.3-4.6
                            c-0.3,3.9-5.1,6.4-5.1,6.4c-6.2,4.6-12.4-0.5-12.4-0.5c-1.6,3.7-5.4,4.6-5.4,4.6c-11,0.6-12.4-8.3-12.4-8.3
                            c-0.4,1-2.6,3.1-2.6,3.1c-7.2,7.1-17.5,2.1-17.5,2.1c-4.9-2.4-1-4.9-1-4.9l-1.2,0.4c0.4-0.1,0.7-0.2,0.7-0.2
                            c-5.3,2.9-3.8,6.7-3.8,6.7c0.7,6.1,10.7,6.9,10.7,6.9c11,1.3,11.4-7.6,11.4-9.2c0.2,4.5,5.4,8,11.7,8c5,0,9.4-2.3,11-5.4
                            c1.5,2.6,5,4.5,9,4.5c5.4,0,10.1-4.5,10.1-8.7l2.6,3.4c2.4,2.9,6.2,2.2,6.2,2.2C456.9,78.5,460.9,75.5,461.6,71.5z"/>
                        <path className="st6" d="M397.6,55.4c0,0,5.7,2.8,8.9-1.7c0,0,1.4-1,1.7-4.4C408.1,49.2,409.8,63.2,397.6,55.4z"/>
                        <path className="st6" d="M408.2,49.9c0,0,4.5,7.7,11.5,1.4c0,0-5.3,7.1-11.9,1.4L408.2,49.9z"/>
                        <path className="st6" d="M433.8,65.7c0,0,6.5,6.3,11.6,0C445.4,65.7,441,70,433.8,65.7z"/>
                        <path className="st6" d="M372.4,65.6c0,0,2.9,5.7,11.2,4.1h0.3c0,0-6,2.8-10.1-0.4C373.9,69.3,372.1,67.5,372.4,65.6z"/>
                    </g>
                </g>
            </g>
            <g id="Capa_13">
                <path className="st5" d="M0,228.3c0,0,96,35.6,185,5.8c81.9-27.4,185.2-12.1,185.2-12.1v150.8H-0.2L0,228.3z"/>
                    <path className="st7" id="inputSVG" d="M259.4,315.2c0,8-5.3,14.5-11.8,14.5H122.7c-6.5,0-11.8-6.5-11.8-14.5v0c0-8,5.3-14.5,11.8-14.5h124.9
                        C254.1,300.7,259.4,307.2,259.4,315.2L259.4,315.2z"/>
                <path id="btnSVG" className="st8" d="M244.9,300.7L244.9,300.7c8,0,14.5,6.5,14.5,14.5v0c0,8-6.5,14.5-14.5,14.5l0,0
                    c-8,0-14.5-6.5-14.5-14.5v0C230.5,307.2,237,300.7,244.9,300.7z"/>
            </g>
            <g id="mailbox">
                <g id="Capa_8">
                    <polyline className="st9" points="191.6,157.3 191.6,95.2 179.7,72.2 156.3,66.6 142.2,70.6 132.9,82.2 129.7,93.5 129.7,157.3 
                        191.6,157.3 		"/>
                </g>
                <g id="Capa_10">
                    <path className="st10" d="M127.2,157.3V95.2c0,0-1.8-32.1,33.5-32.1s0,0,0,0v5.3c0,0-28.1-1.4-28.4,26.8l0.2,62.1H127.2"/>
                    <polyline className="st10" points="175.9,68.4 175.3,68.3 175.3,63.1 176.2,63.1 175.9,68.4 		"/>
                </g>
                <g id="mail" opacity="0" className="st11">
                    <path className="st12" d="M205.8,151.9c0,2.6-2.1,4.7-4.7,4.7h-84.8c-2.6,0-4.7-2.1-4.7-4.7V98.7c0-2.6,2.1-4.7,4.7-4.7h84.8
                        c2.6,0,4.7,2.1,4.7,4.7V151.9z"/>
                    <path className="st13" d="M116.3,156.6h84.8c2.6,0,4.7-2.1,4.7-4.7v-1.2L161,117.7c-1.3-0.9-3.3-0.9-4.6,0l-44.9,32.7v1.4
                        C111.5,154.5,113.7,156.6,116.3,156.6z"/>
                    <path className="st14" d="M201.1,94h-84.8c-2.6,0-4.7,2.1-4.7,4.7v1.2l44.9,34.4c1.3,0.9,3.3,0.9,4.6,0l44.9-34.2v-1.4
                        C205.8,96.1,203.7,94,201.1,94z"/>
                </g>
                <path className="st10" d="M190.1,157.3V95.2c0,0,2-32.5-33.5-32.1c-35.3,0.4,0,0,0,0v5.3c0,0,28.1-1.4,28.4,26.8l-0.2,62.1H190.1"/>
                <rect x="190.1" y="156.9" className="st9" width="69.3" height="6.1"/>
                <polyline className="st8" points="190.3,156.9 190.3,94.7 247.8,94.7 247.8,156.9 190.3,156.9 	"/>
                <path className="st15" d="M190.2,94.7c0,0,0.6-29.9-30.3-31.5l63.5-0.5c0,0,23.3,2.5,24.4,32.1c1,29.6,0,0,0,0l-55.2,0"/>
                <path className="st16" d="M197.2,70.5c0-0.9-0.8-1.7-1.7-1.7h-2.2c-0.9,0-1.7,0.8-1.7,1.7l0,0c0,0.9,0.8,1.7,1.7,1.7h2.2
                    C196.5,72.2,197.2,71.4,197.2,70.5L197.2,70.5z"/>
                <path className="st16" d="M220.3,70.4c0-0.9-0.7-1.6-1.6-1.6H203c-0.9,0-1.6,0.7-1.6,1.6l0,0c0,0.9,0.7,1.6,1.6,1.6h15.6
                    C219.6,72,220.3,71.3,220.3,70.4L220.3,70.4z"/>
                <g id="mailbox-low">
                    <rect x="125.6" y="156.9" className="st15" width="64.5" height="6.1"/>
                </g>
                <g id="Capa_11">
                    <path id="cover-closed" className="st8" d="M190.1,157.3V95.5c0,0,1.7-30.1-31.3-32.4c0,0-33.2-2.5-33.2,33.8v60.4H190.1z"/>
                    <g id="heart">
                        <g>
                            <path className="st16" d="M161.8,85.4c-3.1,0-5.8,1.4-7.6,3.7l0,0l0,0c-1.8-2.2-4.5-3.7-7.6-3.7c-5.3,0-9.6,4.3-9.6,9.6
                                c0,6.6,7.6,11.9,17.2,19.7l0,0l0,0c9.6-7.7,17.2-13.1,17.2-19.7C171.5,89.7,167.1,85.4,161.8,85.4z"/>
                        </g>
                    </g>
                    <path id="cover-open-side" className="st10" d="M185.3,162.9l-0.1-67.8c0,0,3.3-26.4-29.3-32.1c0,0,33.4-2.1,34.1,32.1v67.8H185.3z"/>
                </g>
            </g>
            <g id="mailbox-stick">
                <circle className="st17" cx="220.5" cy="125.3" r="8.3"/>
                <polyline className="st2" points="229.1,120.2 310.5,120.2 310.5,125.3 229.1,125.3 229.1,120.2 	"/>
                <circle className="st3" cx="220.8" cy="122.8" r="8.7"/>
                <circle className="st18" cx="220.8" cy="122.8" r="4.1"/>
                <path className="st19" d="M310.5,125.3l-8.7,21.5c0,0-1.2,2.4-3.4,2.4c-2.2,0-3.6-2.1-3.6-2.1l-9.7-21.8H310.5z"/>
            </g>
                <path id="invisible-heart" display="none" className="st16" d="M192.5,300.7c-3.1,0-5.8,1.4-7.6,3.7l0,0l0,0c-1.8-2.2-4.5-3.7-7.6-3.7c-5.3,0-9.6,4.3-9.6,9.6
                            c0,6.6,7.6,11.9,17.2,19.7l0,0l0,0c9.6-7.7,17.2-13.1,17.2-19.7C202.2,305,197.9,300.7,192.5,300.7z"/>
            </svg>

            <div id="textWrapper">
            <h1 id="title-code">Join the game</h1>
            <div id="formWrapper">
            {/* <p id="placeholdery">Enter your game-code</p> */}
            <input id="game-code" type="text" className="browser-default" autoComplete="off" required />
            <button id="btny" type="button"><i className="material-icons white-text">send</i></button>
            </div>
            <p id="disclaimer">Enter a valid 9-digit code.</p>
            <a style={{color: "#00b0e1",
                        position: "fixed",
                        top: "86.5%",
                        cursor: "pointer"
                    }} 
                onClick={()=>{
                    document.querySelector(".invi").style.display="none"
                }}
            >Close</a>
            <p id="successier">If your game code is correct, you'll be redirected to the lobby! </p>
            </div>
            </div>
        </div>
    )
}

export default Invite
