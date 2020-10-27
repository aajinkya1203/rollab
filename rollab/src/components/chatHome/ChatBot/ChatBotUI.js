import React, { useEffect, useState } from 'react';
import './Chats.css';
import { TweenMax, Cubic, gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Profile from '../../../images/bot.png';


var message = "";

const ChatBotUI = (props) => {
    const [notifs, setNotifs] = useState([])
    useEffect(()=>{
        gsap.registerPlugin(MotionPathPlugin)
        window.$(document).ready(function(){
            var cards = window.$('#card-slider .slider-item').toArray();
            setNotifs(cards);
        });
    }, []);

    function startAnim(node, array){
        if(array.length >= 4 ) {
            TweenMax.fromTo(array[0], 0.5, {x:0, y: 0, opacity:0.75}, {x:0, y: -120, opacity:0, zIndex: 0, delay:0.03, ease: Cubic.easeInOut});
    
            TweenMax.fromTo(array[1], 0.5, {x:79, y: 125, opacity:1, zIndex: 1}, {x:0, y: 0, opacity:0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', ease: Cubic.easeInOut});
    
            TweenMax.to(array[2], 0.5, {motionPath:[{x:0, y:250}, {x:65, y:200}, {x:79, y:125}], boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', zIndex: 1, opacity: 1, ease: Cubic.easeInOut});
    
            TweenMax.fromTo(array[3], 0.5, {x:0, y:400, opacity: 0, zIndex: 0}, {x:0, y:250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut}, );
        } else {
            window.$('#card-slider').append('<p>Sorry, carousel should contain more than 3 slides</p>')
        }
    }
    
    function sortArray(array) {
        clearTimeout(delay);
        var delay = setTimeout(function(){
            var firstElem = array.shift();
            return startAnim(firstElem, array); 
        },100)
    }

    const getResp = async (array) => {
        await fetch('http://localhost:1000/to-bot', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query: message,
            })
        }).then(res=>res.json()).then(data=>{
            let res = divTemplate(data);
            let temp = [...array];
            temp.push(res);
            document.querySelector('#card-slider').append(res);
            setNotifs(temp);
            sortArray(temp);
        }).catch(err=>{
            // console.log("Error occured!", err); 
        })

    }

    const divTemplate = (msg) => {
        
        let div = document.createElement('div');
        div.setAttribute('class', 'slider-item');

        let div1 = document.createElement('div');
        div1.setAttribute('class', "animation-card_image");

        let img = document.createElement('img');
        img.setAttribute("src", "https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg");
        img.setAttribute('alt', '');

        div1.appendChild(img);

        let div2 = document.createElement('div');
        div2.setAttribute('class', 'animation-card_content');
        let h4 = document.createElement('h4');
        h4.setAttribute('class', 'animation-card_content_title title-2');
        h4.innerText = "rollab assistant";
        let p1 = document.createElement("p");
        p1.className = "animation-card_content_description p-2";
        p1.innerText = msg;
        let p2 = document.createElement("p");
        p2.className = "animation-card_content_city";
        p2.innerText = "Just now";

        div2.append(h4)
        div2.append(p1)
        div2.append(p2)
        div.append(div1)
        div.append(div2)
        return div;
    }

    const handleReq = async (e) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'slider-item');

        let div1 = document.createElement('div');
        div1.setAttribute('class', "animation-card_image");

        let img = document.createElement('img');
        img.setAttribute("src", Profile);
        img.setAttribute('alt', '');

        div1.appendChild(img);

        let div2 = document.createElement('div');
        div2.setAttribute('class', 'animation-card_content');
        let h4 = document.createElement('h4');
        h4.setAttribute('class', 'animation-card_content_title title-2');
        h4.innerText = JSON.parse(localStorage.getItem('user')).name;
        let p1 = document.createElement("p");
        p1.className = "animation-card_content_description p-2";
        p1.innerText = e.target.value;
        let p2 = document.createElement("p");
        p2.className = "animation-card_content_city";
        p2.innerText = "Just now";

        div2.append(h4)
        div2.append(p1)
        div2.append(p2)
        div.append(div1)
        div.append(div2);
        message = e.target.value;
        let temp = [...notifs];
        temp.push(div);
        document.querySelector('#card-slider').append(div);
        setNotifs(temp);
        sortArray(temp);
        getResp(temp);
        e.target.value = "";
    }
    

    return (
        <div id="bodz" className="row">
        <div className="slider-wrap">
            <div id="card-slider" className="slider">
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">Hello, I'm your rollab assistant</p>
                        <p className="animation-card_content_city">Just Now</p>
                    </div>
                </div>
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">Hello, I'm your rollab assistant.</p>
                        <p className="animation-card_content_city">Just Now</p>
                    </div>
                </div>
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">You can have any kind of small talks with me and i'll try to answer those. All your notifications will be alerted by me!</p>
                        <p className="animation-card_content_city">Just Now</p>
                    </div>
                </div>
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">Go on and type something again for me to answer!</p>
                        <p className="animation-card_content_city">Just Now</p>
                    </div>
                </div>
            </div>
            <div className="input-field col s6" style={{position: "fixed", bottom: "60px", left: "40px", margin: 0, 
                backgroundColor: "white", borderRadius: "12px", padding: "5px 10px"
                }}>
                <input id="user_query" type="text" 
                    onKeyPress={e => e.key === 'Enter' ? handleReq(e) : null }
                />
                <label htmlFor="user_query" style={{margin:"0"}}>Ask your rollab assistant...</label>
            </div>
            </div>   
        </div>
    )
}

export default ChatBotUI
