import React, { useEffect } from 'react';
import './Chats.css';
import { TweenMax, Cubic, gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';


const ChatBotUI = (props) => {
    useEffect(()=>{
        gsap.registerPlugin(MotionPathPlugin)
        window.$(document).ready(function(){
            var cards = window.$('#card-slider .slider-item').toArray();
            console.log(cards)
            startAnim(cards);
        });
    }, []);

    function startAnim(array){
        if(array.length >= 4 ) {
            TweenMax.fromTo(array[0], 0.5, {x:0, y: 0, opacity:0.75}, {x:0, y: -120, opacity:0, zIndex: 0, delay:0.03, ease: Cubic.easeInOut, onComplete: sortArray(array)});
    
            TweenMax.fromTo(array[1], 0.5, {x:79, y: 125, opacity:1, zIndex: 1}, {x:0, y: 0, opacity:0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', ease: Cubic.easeInOut});
    
            TweenMax.to(array[2], 0.5, {motionPath:[{x:0, y:250}, {x:65, y:200}, {x:79, y:125}], boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', zIndex: 1, opacity: 1, ease: Cubic.easeInOut});
    
            TweenMax.fromTo(array[3], 0.5, {x:0, y:400, opacity: 0, zIndex: 0}, {x:0, y:250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut}, );
        } else {
            window.$('#card-slider').append('<p>Sorry, carousel should contain more than 3 slides</p>')
        }
    }
    
    function sortArray(array) {
        // clearTimeout(delay);
        var delay = setTimeout(function(){
            var firstElem = array.shift();
            array.push(firstElem);
            return startAnim(array); 
        },3000)
    }
    

    return (
        <div id="bodz">
        <div className="slider-wrap">
            <div id="card-slider" className="slider">
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">With no contractual commitments comes the freedom of having top notch content created whenever.</p>
                        <p className="animation-card_content_city">New York, NY</p>
                    </div>
                </div>
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">With no contractual commitments comes the freedom of having top notch content created whenever.</p>
                        <p className="animation-card_content_city">New York, NY</p>
                    </div>
                </div>
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">With no contractual commitments comes the freedom of having top notch content created whenever.</p>
                        <p className="animation-card_content_city">New York, NY</p>
                    </div>
                </div>
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">With no contractual commitments comes the freedom of having top notch content created whenever.</p>
                        <p className="animation-card_content_city">New York, NY</p>
                    </div>
                </div>
                <div className="slider-item">
                    <div className="animation-card_image">
                        <img src="https://i.pinimg.com/originals/fd/a1/3b/fda13b9d6d88f25a9d968901d319216a.jpg" alt="" />
                    </div>
                    <div className="animation-card_content">
                        <h4 className="animation-card_content_title title-2">rollab assistant</h4>
                        <p className="animation-card_content_description p-2">With no contractual commitments comes the freedom of having top notch content created whenever.</p>
                        <p className="animation-card_content_city">New York, NY</p>
                    </div>
                </div>
            </div>
            </div>   
        </div>
    )
}

export default ChatBotUI
