import React, { useEffect } from 'react';
import Navbar from '../layout/Header';
import './Delete.scss';

const Delete = (props) => {
    useEffect(()=>{
        const $ = (s, o = document) => o.querySelector(s);

        var unsubscribe = $('#unsubscribe'),
            game = $('.game-delete', unsubscribe),
            confirmButton = $('.confirm', unsubscribe),
            startButton = $('.start-delete', game),
            closeButton = $('.close', game);

        var ball = {
                elem: $('.ball', game),
                x: 0,
                y: 0,
                top: 0,
                left: 0
            },
            one = {
                elem: $('.paddle.one', game),
                y: 0,
                top: 0,
                score: 0
            },
            two = {
                elem: $('.paddle.two', game),
                y: 0,
                score: 0
            },
            interval;

        function init() {

            if(game.classList.contains('idle')) {

                one.y = game.offsetHeight / 2 - one.elem.offsetHeight / 2;
                two.y = game.offsetHeight / 2 - one.elem.offsetHeight / 2;

                start();

                game.classList.remove('idle');
                game.classList.add('init');

            }

        }

        startButton.addEventListener('click', init);

        confirmButton.addEventListener('click', e => {
            unsubscribe.classList.add('show-game');
        });

        closeButton.addEventListener('click', e => {
            unsubscribe.classList.add('hide-game');
            unsubscribe.classList.remove('show-game');
            setTimeout(() => unsubscribe.classList.remove('hide-game'), 800);
        });

        function start() {

            ball.x = game.offsetWidth / 2 - ball.elem.offsetWidth / 2;
            ball.y = game.offsetHeight / 2 - ball.elem.offsetHeight / 2;
            ball.top = Math.random() * 2 + 2;
            //ball.left = ((Math.random() < .5) ? 1 : -1) * (Math.random() * 2 + 2);
            ball.left = (1 * Math.random() * 2 + 2);

            interval = window.setInterval(render, 1000 / 60);
        }

        function render() {

            one.y += one.top;
            two.y = ball.y - two.elem.offsetHeight / 2;

            ball.x += ball.left;
            ball.y += ball.top;

            if(one.y <= 0) {
                one.y = 0;
            }

            if(two.y <= 0) {
                two.y = 0;
            }

            if(one.y >= game.offsetHeight - one.elem.offsetHeight) {
                one.y = game.offsetHeight - one.elem.offsetHeight;
            }

            if(two.y > game.offsetHeight - two.elem.offsetHeight) {
                two.y = game.offsetHeight - two.elem.offsetHeight;
            }

            if(ball.y <= 0 || ball.y >= game.offsetHeight - ball.elem.offsetHeight) {
                ball.top = -ball.top;
            }

            if(ball.x <= (one.elem.offsetWidth - 2)) {
                if((ball.y + ball.elem.offsetHeight / 2 ) > one.y && (ball.y + ball.elem.offsetHeight / 2 ) < one.y + one.elem.offsetHeight) {
                    ball.left = -ball.left;
                } else {
                    two.score++;
                    setTimeout(() => game.classList.add('idle'), 500);
                    clearInterval(interval);
                    //start();
                }
            }

            if(ball.x >= game.offsetWidth - ball.elem.offsetWidth - (two.elem.offsetWidth - 2)) {
                if((ball.y + ball.elem.offsetHeight / 2 ) > two.y && (ball.y + ball.elem.offsetHeight / 2 ) < two.y + two.elem.offsetHeight) {
                    ball.left = -ball.left;
                } else {
                    one.score++
                    setTimeout(() => game.classList.add('idle'), 500);
                    clearInterval(interval);
                    //start();
                }
            }

            one.elem.style.setProperty('--y', one.y + 'px');
            two.elem.style.setProperty('--y', two.y + 'px');
            ball.elem.style.setProperty('--x', ball.x + 'px');
            ball.elem.style.setProperty('--y', ball.y + 'px');

        }

        const forKeyDown = e => {
            console.log("here")
            e.preventDefault();
            init();
            if(e.keyCode === 38 || e.which === 38) {
                one.top = -8;
            }
            if(e.keyCode === 40 || e.which === 40) {
                one.top = 8;
            }
        }

        document.addEventListener('keydown', forKeyDown, false);
        const forKeyUp = e => {
            e.preventDefault();
            init();
            if(e.keyCode === 38 || e.which === 38) {
                one.top = 0;
            }
            if(e.keyCode === 40 || e.which === 40) {
                one.top = 0;
            }
        }
        document.addEventListener('keyup', forKeyUp, false);

        return ()=>{
            document.removeEventListener('keyup', forKeyUp, false);
            document.removeEventListener('keydown', forKeyDown, false);
       }

    }, [])
    return (
        <>
        <Navbar props={props} />
        <div className="valign-wrapper" style={{height: "100vh"}}>
            <div id="unsubscribe" style={{margin: "0 auto"}}>
                <div className="letter">
                    <div className="shadow"></div>
                    <div className="background"></div>
                    <div className="body-delete">
                        <div className="game-delete idle">

                            <div className="headline">
                                <span>Win Ping Pong to delete your account</span>
                                <div className="close">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="paddle one"></div>
                            <div className="ball"></div>
                            <div className="paddle two"></div>
                            <div className="start-delete">
                                <button>Start</button>
                                <small>or press up/down key</small>
                            </div>

                        </div>
                    </div>
                </div>
                <h1>Delete your account</h1>
                <p>We are sorry to see you go!</p>
                <div className="cta">
                    <button className="confirm">
                        Confirm
                    </button>
                </div>
            </div>
    
        </div>
    </>
    )
}

export default Delete
