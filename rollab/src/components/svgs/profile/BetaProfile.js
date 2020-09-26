import React, { useEffect } from 'react';
import './Beta.scss';

const BetaProfile = () => {
    
        window.$('.trigger').click(function() {
            window.$('.page_portfolio').css('opacity', '1');
            window.$('.page_portfolio').css('clip-path', 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)');
            window.$('.logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger').addClass('out');
            window.$('.slider_inner').addClass('in')
            setTimeout(function(){
                window.$('.slider_inner').click()
        
            }, 2500)
        });
        
        var introComplete = false;
        
        setTimeout(function(){
            introComplete = true;
        }, 2500)
        
        var scrollPosition = 0;
        window.addEventListener('wheel', function(e) {
        
            if (e.deltaY > 0) {
                scrollPosition += 10;
                window.$('.content').css('top', -scrollPosition + 'px')
                console.log(e.deltaY)
                if(introComplete) {
                    window.$('.page_portfolio').css('opacity', '1');
                    window.$('.page_portfolio').css('clip-path', 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)');
                    window.$('.logo img, .portfolio_home__title h1, .portfolio_home__title hr, .portfolio_home__title img.trigger').addClass('out');
                    window.$('.slider_inner').addClass('in')
                    setTimeout(function(){
                        window.$('.slider_inner').click()
        
                    }, 2000)
                    
                    
                }
            } else {
                scrollPosition -= 10;
            }
        });
        
        window.$('.button').click(function(){
            window.$(this).parent().addClass('clicked')
            window.$(this).parent().parent().parent().addClass('clicked')
            //window.$('.portfolio_home__work').css('opacity', 1);
            window.$('.portfolio_home__work').addClass('expand')
        
        })
        
        // Gross but only a demo
        
        window.$(window).resize(function(){
            window.$('.slider_inner').css('left', (window.$(document).width() / 2) - (window.$('.slider_inner__slide').width() / 2));
        })
        
        window.$('.slider_inner').css('left', (window.$(document).width() / 2) - (window.$('.slider_inner__slide').width() / 2));
        
        var dragging = false;
        var endPosition = 0;
        var threshold = 100;
        
        window.$('.slider_inner').click(function() {
            window.$('.slider_inner__slide').css('animation', 'none')
            window.$('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)')
        })
        var initX;
        window.$('.slider_inner').mousedown(function(e) {
            initX = e.clientX;
            dragging = true;
            //window.$('.slider_inner__slide').css('animation', 'none')
            window.cursor.style.transition = `transform 0s 0s`;
        
            console.log(window.cursor)
        })
        var difference, position;
        window.$('.slider_inner').mousemove(function(e) {
        
            if(dragging) {
                let mouseX = e.clientX;
                difference = mouseX - initX;
        
        
                //window.$('.slider_inner__slide').css('transform', 'rotateY(' + direction + pps / 110 + 'deg) scale(1)')
                position  = parseInt(window.$('.slider_inner').css('transform').split(',')[4]);
                //console.log('position is ' + position)
                window.$('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1 -Math.abs(difference / 200))
                
                        window.$('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('transition', 'all .2s')
        
                window.$('.slider_inner').css('transform', `translateX(${difference + endPosition}px) translateY(120px)`);
        
        
            }
        });
        
        // 520 -40 -600 -1150
        
        // 560 
        
        
        var offset = 760;
        var margin = 0;
        
        var index = 1;
        
        window.$('.slider_inner').mouseup(function() {
            window.cursor.style.transition = `transform ${cursorSettings.transitionTime} ${cursorSettings.transitionEase}, width ${cursorSettings.expandSpeed}s .2s, height ${cursorSettings.expandSpeed}s .2s, opacity 1s .2s`;
            endPosition = parseInt(window.$('.slider_inner').css('transform').split(',')[4]);
        
        
            if(difference < -160) {
                console.log('snap to next')
                if(index < 3) {
                    index++;
                    var threshold = offset - ((offset + margin) * index);
                    window.$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
                    endPosition = threshold;
        
                } else {
                    var threshold = offset - ((offset + margin) * index);
                    window.$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
                    endPosition = threshold; 
        
                }
        
            } else {
                if(difference > 160) {
                    if(index > 0) {
                        index--;
                        var threshold = offset - ((offset + margin) * index);
                        window.$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
                        endPosition = threshold;
        
                    } else {
                        var threshold = offset - ((offset + margin) * index);
                        window.$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
                        endPosition = threshold; 
        
                    }
        
                } else {
                    var threshold = offset - ((offset + margin) * index);
                    window.$('.slider_inner').css('transform', `translateX(${threshold}px) translateY(120px)`);
                    endPosition = threshold;
        
                }
            }
        
            dragging = false;
            console.log('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ')')
            window.$('.slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .overlay, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .title, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .cats, .slider_inner__slide:nth-of-type(' + parseInt(index + 1) + ') .image .button').css('opacity', 1)
            window.$('.slider_inner__slide').css('transform', 'rotateY(0deg) scale(1)')
            window.$('.slideClone').hide();
            window.$('.slideClone:nth-of-type('  + parseInt(index + 2) +  ')').show();
            difference = 0
        })
        
        // https://gist.github.com/ripper234/5757309
        
        function drawMouseSpeedDemo() {
            var mrefreshinterval = 30; // update display every 500ms
            var lastmousex=-1; 
            var lastmousey=-1;
            var lastmousetime;
            var mousetravel = 0;
            var mpoints = [];
            var mpoints_max = 30;
            var direction;
        
            window.$('.ui').mousemove(function(e) {
                var mousex = e.pageX;
                var mousey = e.pageY;
                if (lastmousex > -1) {
                    mousetravel += Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) );
                }
                // console.log(mousex-lastmousex)
        
                if(mousex-lastmousex > 0) {
                    direction = '+'
                } else {
                    direction = '-'
                }
        
                //console.log(direction);
        
                lastmousex = mousex;
                lastmousey = mousey;
            });
            var mdraw = function() {
                var md = new Date();
                var timenow = md.getTime();
                if (lastmousetime && lastmousetime!=timenow) {
                    var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
                    mpoints.push(pps);
                    if (mpoints.length > mpoints_max)
                        mpoints.splice(0,1);
                    mousetravel = 0;
                    //console.log(pps)
                    if(dragging) {
                        let velocity = .5 - (pps / 40000);
        
        
        
                        window.$('.slider_inner__slide').css('transform', 'rotateY(' + direction + pps / 110 + 'deg) scale(1)')
                        window.$('.slider_inner__slide').css('transition', 'all ' + velocity + 's');
                        //console.log(velocity)
                    }
        
                }
                lastmousetime = timenow;
                setTimeout(mdraw, mrefreshinterval);
            }
            // We could use setInterval instead, but I prefer to do it this way
            setTimeout(mdraw, mrefreshinterval); 
        };
        
        drawMouseSpeedDemo()
        
        /* -------------------------------------------------
        
        Dynamic window.cursor
        
        --------------------------------------------------- */
        
        const cursorSettings = {
            'class' : 'dynamicCursor',
            'size' : '18',
            'expandedSize' : '40',
            'expandSpeed' : 0.4,
            'background' : 'rgba(161, 142, 218, 0.25)',
            'opacity' : '1',
            'transitionTime' : '1.4s',
            'transitionEase' : 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
            'borderWidth' : '0',
            'borderColor' : 'black',
            'iconSize': '11px',
            'iconColor': 'white',
            'triggerElements': {
                'trigger' : {
                    'className' : 'trigger',
                    'icon' : '<i class="fa fa-plus"></i>'
                },
                'trigger2' : {
                    'className' : 'slider_inner',
                    'icon' : '<i class="fa fa-arrows-h"></i>'
                }
            }
        }
        
        
        function dynamicCursor(options) {
        
            document.write('<link rel="stylesheet" href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome-font-awesome.min.css">');
        
            var hold;
            window.cursor = document.createElement('div');
            let cursorIcon = document.createElement('div');
        
            cursorIcon.classList.add('cursorIcon');
            cursorIcon.style.position = 'absolute';
            cursorIcon.style.fontFamily = 'Raleway';
            cursorIcon.style.textTransform = 'uppercase';
            cursorIcon.style.fontWeight = '800';
            cursorIcon.style.textAlign = 'center'
            cursorIcon.style.top = '50%';
            cursorIcon.style.width = '100%';
            cursorIcon.style.transform = 'translateY(-50%)';
            cursorIcon.style.color = options.iconColor;
            cursorIcon.style.fontSize = options.iconSize;
            cursorIcon.style.opacity = 0;
            cursorIcon.style.transition = `opacity ${options.expandSpeed}s`;
        
            window.cursor.classList.add(options.class);
            window.cursor.style.boxSizing = 'border-box';
            window.cursor.style.width = `${options.size}px`;
            window.cursor.style.height = `${options.size}px`;
            window.cursor.style.borderRadius = `${options.expandedSize}px`;
            window.cursor.style.opacity = 0;
        
            window.cursor.style.pointerEvents = 'none';
            window.cursor.style.zIndex = 999;
            window.cursor.style.transition = `transform ${options.transitionTime} ${options.transitionEase}, width ${options.expandSpeed}s .2s, height ${options.expandSpeed}s .2s, opacity 1s .2s`;
            window.cursor.style.border = `${options.borderWidth}px solid ${options.borderColor}`;
            window.cursor.style.position = 'fixed';
            window.cursor.style.background = options.background;
        
            window.cursor.appendChild(cursorIcon);
            document.body.appendChild(window.cursor);
        
            setTimeout(function() {
                window.cursor.style.opacity = options.opacity;
            }, 500)
        
            var idle;
            var x, y;
            document.onmousemove = e => {
                console.log('test')
                x = e.pageX;
                y = e.pageY;
        
                window.cursor.style.opacity = options.opacity;
                clearInterval(idle)
        
                idle = setTimeout(function() {
                    window.cursor.style.opacity = 0;
                }, 4000)
        
                window.cursor.style.top = '0';
                window.cursor.style.left = '0';
                window.cursor.style.transform = `translateX(calc(${x}px - 50%)) translateY(calc(${y}px - 50%))`;
            }
        
            for(var i in options.triggerElements) {
        
                let trigger = window.$(`.${options.triggerElements[i].className}`);
        
                console.log(trigger);
        
        
                let icon = options.triggerElements[i].icon;
        
                if(!trigger) {
                    console.warn('You dont have any triggers');
                } else {
                    trigger.each(function(el){
        
                        console.log()
                        trigger[el].style.window.cursor = 'default';
                        trigger[el].addEventListener('mouseover', () => {
                            console.log('over')
                            window.cursor.style.width = `${options.expandedSize}px`;
                            window.cursor.style.height = `${options.expandedSize}px`;
                            cursorIcon.innerHTML = icon;
                            cursorIcon.style.opacity = 1;
        
        
                            console.log(window.$(this))
        
        
                        })
        
                        trigger[el].addEventListener('mouseout', () => {
                            window.cursor.style.width = `${options.size}px`;
                            window.cursor.style.height = `${options.size}px`;
                            cursorIcon.style.opacity = 0;
                        })
                    })
        
                }
            }
        }
        
        dynamicCursor(cursorSettings);
        
         window.$('.back').click(function(){
             window.$(this).parent().parent().removeClass('expand')
         })
        
        // make go back from page to slider again
    return (
        <div className="ui">
            <div className='cursor'>
                <div className='cursor_point'></div>
                <div className='cursor_outer'></div>
            </div>
            <div className='portfolio'>
            <div className='portfolio_home'>
                <div style={{position: "fixed", zIndex: "-99", width: "2320px", height: "180%", left: '0',top: "-38%"}}>
                    <iframe frameBorder="0" height="100%" width="100%" src="https://youtube.com/embed/tz8Puc4W5BM?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1"></iframe>
                </div>
                <div className='portfolio_home__header'>
                    <div className='hamburger trigger'>
                        <div className='hamburger_part'></div>
                        <div className='hamburger_part'></div>
                        <div className='hamburger_part'></div>
                    </div>
                </div>
                <div className='portfolio_home__title'>
                <div className='logo'>
                    <img className='first' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp.png'/>
                    <img className='second' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/clogotemp2.png'/>
                    <div className='page_portfolio'>
                    <div className='portfolio_home__header'>
                        <div className='logoMain'>
                            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cagencylogo.png'/>
                        </div>
                        <div className='nav'>
                            <ul>
                                <li className='active trigger'>Our work</li>
                                <li className='trigger'>Our services</li>
                                <li className='trigger'>About us</li>
                                <li className='trigger'>Contact us</li>
                            </ul>
                        </div>
                        <div className='number black'>0161 345 3464</div>
                            <div className='hamburger black trigger'>
                            <div className='hamburger_part'></div>
                            <div className='hamburger_part'></div>
                            <div className='hamburger_part'></div>
                        </div>
                    </div>
                    <div className='slider_note'>
                        Drag through our work
                    </div>
                    <div className='portfolio_home__work'>
                        <div className='portfolio_home__header work'>
                            <div className='back'>
                                <img className='trigger' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png'/>
                            </div>
                            <div className='logoMain'>
                                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/slogowhite.png'/>
                            </div>
                            <div className='nav'>
                                <ul>
                                <li className='active trigger'>Our work</li>
                                <li className='trigger'>Our services</li>
                                <li className='trigger'>About us</li>
                                <li className='trigger'>Contact us</li>
                                </ul>
                            </div>
                            <div className='number white'>0161 345 3464</div>
                            <div className='hamburger white trigger'>
                                <div className='hamburger_part'></div>
                                <div className='hamburger_part'></div>
                                <div className='hamburger_part'></div>
                            </div>
                        </div>
                        <div className='slideClone'>
                        <div className='title f'>
                            .01
                            <br />
                            My Protein
                        </div>
                        <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/fud.png' />
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DESIGN   DIGITAL</div>
                            <div className='title'>My protein rebrand and digital campaign</div>
                        </div>
                        </div>
                        <div className='slideClone'>
                        <div className='title f'>
                            .02
                            <br />
                            Nike Air Max
                        </div>
                        <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/nike.png' />
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DESIGN   DIGITAL   STRATEGY</div>
                            <div className='title'>Nike Air max video campaign 2017</div>
                        </div>
                        </div>
                        <div className='slideClone'>
                        <div className='title f'>
                            .03
                            <br />
                            Apple Watch
                        </div>
                        <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/rpo.jpg' />
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DIGITAL   STRATEGY</div>
                            <div className='title'>The new Apple Watch digital campaign 2019</div>
                        </div>
                        </div>
                        <div className='slideClone'>
                        <div className='title f'>
                            .04
                            <br />
                            Jade Teriyaki
                        </div>
                        <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/orangetyhing.png' />
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DESIGN   DIGITAL   STRATEGY</div>
                            <div className='title'>Another agency did this campaign, not us</div>
                        </div>
                        </div>
                        <img className='scroll' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png' />
                    </div>
                    <div className='portfolio_home__slider'>
                        <div className='slider_inner'>
                        <div className='slider_inner__slide'>
                            <div className='title'>
                            .01
                            <br />
                            My Protein
                            </div>
                            <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/fud.png' />
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DESIGN   DIGITAL</div>
                            <div className='title'>My protein rebrand and digital campaign</div>
                            <div className='button'>
                                View case study
                                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png' />
                            </div>
                            </div>
                        </div>
                        <div className='slider_inner__slide'>
                            <div className='title'>
                            .02
                            <br />
                            Nike Air Max
                            </div>
                            <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/nike.png' />
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DESIGN   DIGITAL   STRATEGY</div>
                            <div className='title'>Nike Air max video campaign 2017</div>
                            <div className='button'>
                                View case study
                                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png' />
                            </div>
                            </div>
                        </div>
                        <div className='slider_inner__slide'>
                            <div className='title'>
                            .03
                            <br />
                            Apple Watch
                            </div>
                            <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/rpo.jpg' />
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DIGITAL   STRATEGY</div>
                            <div className='title'>The new Apple Watch digital campaign 2019</div>
                            <div className='button'>
                                View case study
                                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png' />
                            </div>
                            </div>
                        </div>
                        <div className='slider_inner__slide'>
                            <div className='title'>
                            .04
                            <br />
                            Jade Teriyaki
                            </div>
                            <div className='image'>
                            <img draggable='false' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/orangetyhing.png'/>
                            <div className='overlay'></div>
                            <div className='cats'>ADVERTISING   DESIGN   DIGITAL   STRATEGY</div>
                            <div className='title'>Another agency did this campaign, not us</div>
                            <div className='button'>
                                View case study
                                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png'/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <hr />
                <h1>
                    We are an Independent
                    <span>Creative Advertising</span>
                    &amp;
                    <span>Branding Agency</span>
                </h1>
                <img className='trigger' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png' />
                </div>
            </div>
        </div>
 
        </div>
    )
}

export default BetaProfile
