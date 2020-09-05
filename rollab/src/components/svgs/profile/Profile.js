import React, { useEffect } from 'react';
import './prof.scss';
import { TimelineMax, TweenMax } from 'gsap';
import Navbar from '../../layout/Header';
import Acc from '../../../images/Profile/Acc.png'
import Usage from '../../../images/Profile/Usage.png'
import about from '../../../images/Profile/about.png'

const Profile = (props)=> {
    useEffect(()=>{
        class Loader {

            constructor() {
        
                this.container = document.querySelector('#loader');
                this.greyy = this.container.querySelector('.greyy');
                this.whitey = this.container.querySelector('.whitey');
                this.textWrap = this.container.querySelector('.text-wrap');
                this.text = this.container.querySelector('.text');
                this.dot = this.text.querySelector('span');
                this.animateDot();
        
            }
        
            animateDot() {
        
                this.dotTween = TweenMax.fromTo( this.dot, 0.5, {
                    y: 0
                }, {
                    y: -10,
                    ease: 'Power0.easeOut',
                    yoyo: true,
                    yoyoEase: 'Bounce.easeOut',
                    repeat: -1,
                    repeatDelay: 0.3
                })
        
            }
        
            hide() {
        
                let tl = new TimelineMax({
                    delay: 0.5,
                    onComplete: () => {
                        this.dotTween.kill();
                        this.container.style.display = 'none';
                    }
                });
        
                tl.to( this.text, 0.8, {
                    y: 100,
                    ease: 'Expo.easeIn'
                }, 0 )
        
                .to( this.greyy, 1, {
                    yPercent: 100,
                    ease: 'Expo.easeOut'
                }, 0.8 )
        
                .to( this.whitey, 1, {
                    yPercent: 100,
                    ease: 'Expo.easeOut'
                }, 1 )
              
              .fromTo( '#slider-canvas', 1, {
                    scale: 1.1
                }, {
                    scale: 1,
                    ease: 'Expo.easeOut'
                }, 1)
        
            }
        
        }
        
        class Slider {
        
            constructor( canvas, loader ) {
        
                this.canvas = canvas;
                this.loader = loader;
        
                this.setOptions();
                this.createApp();
                this.loadImages();
        
            }
        
            setOptions() {
        
                window.PIXI.utils.skipHello(); // turn off console branding
                window.PIXI.settings.SCALE_MODE = window.PIXI.SCALE_MODES.LINEAR;
                window.PIXI.settings.PRECISION_FRAGMENT = window.PIXI.PRECISION.HIGH;
        
                this.canvasWidth = this.canvas.clientWidth;
                this.canvasHeight = this.canvas.clientHeight;
                this.dpr = window.devicePixelRatio && window.devicePixelRatio >= 2 ? 2 : 1;
                this.thumbsVisible = false;
                this.animating = false;
        
                this.dom = {
                    titleNext: document.querySelector('.slide-title .next'),
                    titleCurrent: document.querySelector('.slide-title .current'),
                    descriptionNext: document.querySelector('.description .next'),
                    descriptionCurrent: document.querySelector('.description .current'),
                    countNext: document.querySelector('.slide-count .next'),
                    countCurrent: document.querySelector('.slide-count .current')
                }
        
                this.slideData = {
                    0: {
                        image: Acc,
                        title: 'Account',
                        description: `Name: ${JSON.parse(localStorage.getItem("user")).name}<br/>Email: ${JSON.parse(localStorage.getItem("user")).email}`
                    },
                    1: {
                        image: Usage,
                        title: 'Usage',
                        description: `Track your usage, activity and your favourite pals based on<br/>the frequency! This part of the site is more of a statistical<br/>part and lets you have an overview of your whole activity on<br/>rollab.
                        <br/><br/>
                        <a href="/dashboard" class="btn white-text">Know More</a>
                        `
                    },
                    2: {
                        image: about,
                        title: 'rollab',
                        description: `rollab. The very thing you're seeing right now, is an <br/>online-web-chatting platform with a few multiplayer <br/>games integrated into it. It has a chat-bot which <br/>can do a lot of your fancy stuffs including hosting a<br/>listening party. Let's vibe together, shall we?.`
                    }
                }
        
            }
        
            createApp() {
        
                this.app = new window.PIXI.Application( this.canvasWidth, this.canvasHeight, {
                    view: this.canvas,
                    width: this.canvasWidth,
                    height: this.canvasHeight,
                    transparent: true,
                    resolution: this.dpr,
                    autoResize: true
                });
        
            }
        
            loadImages() {
        
                Object.keys( this.slideData ).forEach( key => {
                    window.PIXI.loader.add( key, this.slideData[key].image );
                });
        
                window.PIXI.loader.load( ( l, images ) => {
        
                    this.images = images;
                    this.createSlider();
                    this.loader.hide();
        
                });
        
            }
        
            createSlider() {
        
                this.slider = new window.PIXI.Container();
                this.slider.width = this.app.screen.width;
                this.slider.height = this.app.screen.height;
                this.app.stage.addChild( this.slider );
        
                this.clipRect = new window.PIXI.Rectangle( 0, 0, this.app.screen.width, this.app.screen.height );
                this.slider.filterArea = this.clipRect;
        
                this.app.stage.interactive = true;
                this.app.stage.on( 'pointerdown', () => {
                    this.thumbsVisible ? this.hideThumbs() : this.showThumbs();
                });
        
                this.addSlides();
                this.createDisplacementFilter();
                this.buttonEvents();
        
            }
        
            addSlides() {
        
                this.slides = {
                    activeIndex: 0,
                    count: 0
                }
        
                let i = 0;
        
                Object.keys( this.images ).forEach( key => {
        
                    let slide = new window.PIXI.Sprite( this.images[key].texture );
                    slide.width = this.app.screen.width;
                    slide.height = this.app.screen.height;
                    slide.y = i === 0 ? 0 : -this.app.screen.height;
        
                    this.slides[ i ] = slide;
                    this.slider.addChild( slide );
        
                    i++;
                    this.slides.count++;
                    
                });
        
                document.querySelector( '.slide-count .total' ).textContent = `0${this.slides.count}`;
                document.querySelector( '.slide-title .code' ).style.width = this.dom.titleCurrent.scrollWidth + 6 + 'px';
        
                for( let i = 0; i < this.slides.count; i++ ) {
                    document.querySelector( '.dots' ).innerHTML += '<span></span>';
                }
        
                document.querySelector( '.dots > span:nth-child(1)' ).classList.add('active');
        
            }
        
            nextSlide() {
        
                if( this.nextBtn.getAttribute( 'disabled' ) || this.thumbsVisible || this.animating ) return false;
        
                this.prevBtn.removeAttribute( 'disabled' );
        
                if( this.slides.activeIndex + 2 >= this.slides.count ) {
                    this.nextBtn.setAttribute( 'disabled', 'disabled' );
                }
        
                let nextSlideData = this.slideData[ this.slides.activeIndex + 1];
                this.dom.titleNext.textContent = nextSlideData.title;
                this.dom.descriptionNext.innerHTML = nextSlideData.description;
                this.dom.descriptionNext.style.whiteSpace = "pre";
                this.dom.countNext.textContent = '0' + ( this.slides.activeIndex + 2 );
        
                this.updateDot( true );
        
                let tl = new TimelineMax({
                    onStart: () => {
                        this.animating = true;
                    },
                    onComplete: () => {
                        this.slides.activeIndex++;
                        this.resetText();
                        this.animating = false;
                    }
                });
        
                tl.to( this.slides[ this.slides.activeIndex ], 2, {
                    y: this.app.screen.height,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .fromTo( this.slides[ this.slides.activeIndex + 1 ], 2, {
                    y: -this.app.screen.height
                }, {
                    y: 0,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .to( this.dispFilter.scale, 1, {
                    x: 10,
                    y: 10,
                    ease: 'Power2.easeInOut'
                }, 0 )
        
                .to( this.dispFilter.scale, 1, {
                    x: 0,
                    y: 0,
                    ease: 'Power2.easeInOut'
                }, 1 )
        
                .set( '.slide-count .next', { top: '-100%' }, 0 )
        
                .fromTo( ['.slide-count .current', '.slide-count .next'], 2, {
                    yPercent: 0
                }, {
                    yPercent: 100,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .set( '.slide-title .next', { top: '-100%' }, 0 )
        
                .fromTo( ['.slide-title .current', '.slide-title .next'], 2, {
                    yPercent: 0
                }, {
                    yPercent: 100,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .to( '.slide-title .code', 2, {
                    width: this.dom.titleNext.scrollWidth + 6,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .fromTo( '.description .current', 2, {
                    y: 0,
                    autoAlpha: 1,
                }, {
                    y: 40,
                    autoAlpha: 0,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .fromTo( '.description .next', 2, {
                    y: -40,
                    autoAlpha: 0,
                }, {
                    y: 0,
                    autoAlpha: 1,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
            }
        
            prevSlide() {
        
                if( this.prevBtn.getAttribute( 'disabled' ) || this.thumbsVisible || this.animating ) return false;
        
                this.nextBtn.removeAttribute( 'disabled' );
        
                if( this.slides.activeIndex - 2 < 0 ) {
                    this.prevBtn.setAttribute( 'disabled', 'disabled' );
                }
        
                let nextSlideData = this.slideData[ this.slides.activeIndex - 1];
                this.dom.titleNext.textContent = nextSlideData.title;
                this.dom.descriptionNext.innerHTML = nextSlideData.description;
                this.dom.descriptionNext.style.whiteSpace = "pre"
                this.dom.countNext.textContent = '0' + ( this.slides.activeIndex );
        
                this.updateDot( false );
        
                let tl = new TimelineMax({
                    onStart: () => {
                        this.animating = true;
                    },
                    onComplete: () => {
                        this.slides.activeIndex--;
                        this.resetText();
                        this.animating = false;
                    }
                });
        
                tl.to( this.slides[ this.slides.activeIndex ], 2, {
                    y: -this.app.screen.height,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .fromTo( this.slides[ this.slides.activeIndex - 1 ], 2, {
                    y: this.app.screen.height
                }, {
                    y: 0,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .to( this.dispFilter.scale, 1, {
                    x: 10,
                    y: 10,
                    ease: 'Power2.easeInOut'
                }, 0 )
        
                .to( this.dispFilter.scale, 1, {
                    x: 0,
                    y: 0,
                    ease: 'Power2.easeInOut'
                }, 1 )
        
                .set( '.slide-count .next', { top: '100%' }, 0 )
        
                .fromTo( ['.slide-count .current', '.slide-count .next'], 2, {
                    yPercent: 0
                }, {
                    yPercent: -100,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .set( '.slide-title .next', { top: '100%' }, 0 )
        
                .fromTo( ['.slide-title .current', '.slide-title .next'], 2, {
                    yPercent: 0
                }, {
                    yPercent: -100,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .to( '.slide-title .code', 2, {
                    width: this.dom.titleNext.scrollWidth + 6,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .fromTo( '.description .current', 2, {
                    y: 0,
                    autoAlpha: 1,
                }, {
                    y: -40,
                    autoAlpha: 0,
                    ease: 'Expo.easeInOut'
                }, 0 )
        
                .fromTo( '.description .next', 2, {
                    y: 40,
                    autoAlpha: 0,
                }, {
                    y: 0,
                    autoAlpha: 1,
                    ease: 'Expo.easeInOut'
                }, 0 )
                
            }
        
            resetText() {
                this.dom.titleCurrent.textContent = this.dom.titleNext.textContent;
                this.dom.titleCurrent.removeAttribute('style');
                this.dom.titleNext.textContent = '';
                this.dom.titleNext.removeAttribute('style');
                
                this.dom.descriptionCurrent.innerHTML = this.dom.descriptionNext.innerHTML;
                this.dom.descriptionCurrent.removeAttribute('style');
                this.dom.descriptionNext.innerHTML = '';
                this.dom.descriptionNext.removeAttribute('style');
        
                this.dom.countCurrent.textContent = this.dom.countNext.textContent;
                this.dom.countCurrent.removeAttribute('style');
                this.dom.countNext.textContent = '';
                this.dom.countNext.removeAttribute('style');
        
            }
        
            createDisplacementFilter() {
        
                this.dispSprite = window.PIXI.Sprite.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/disp5.jpg');
                this.dispSprite.texture.baseTexture.wrapMode = window.PIXI.WRAP_MODES.REPEAT;
                this.dispSprite.skew.x = 1;
                this.dispSprite.skew.y = -1;
                this.dispSprite.position.y = 380;
                this.dispSprite.scale.y = 1.8;
                this.dispSprite.scale.x = 1.8;
                this.app.stage.addChild( this.dispSprite );
        
                this.dispFilter = new window.PIXI.filters.DisplacementFilter( this.dispSprite, 0 );
        
                this.slider.filters = [ this.dispFilter ];
        
            }
        
            buttonEvents() {
        
                this.prevBtn = document.querySelector('.slide-nav [data-direction="prev"]');
                this.nextBtn = document.querySelector('.slide-nav [data-direction="next"]');
                this.prevBtn.addEventListener( 'click', this.prevSlide.bind( this ) );
                this.nextBtn.addEventListener( 'click', this.nextSlide.bind( this ) );
              
              document.onkeydown = (e) => {
                e = e || window.event;
                if (e.keyCode === 38) {
                    this.prevSlide.call( this );
                }
                else if (e.keyCode === 40) {
                    this.nextSlide.call( this );
                }
              }
        
            }
        
            showThumbs() {
        
                this.thumbsVisible = true;
                this.canvas.classList.add('thumbs-visible');
        
                this.thumbsTl = new TimelineMax();
        
                this.thumbsTl
                
                    .fromTo( this.clipRect, 3, {
                        y: 0
                    }, {
                        y: this.app.screen.height + 50,
                        ease: 'Expo.easeInOut'
                    }, 0 )
        
                    .fromTo( this.dispFilter.scale, 2, {
                        x: 0,
                        y: 0
                    }, {
                        x: 10,
                        y: 10,
                        ease: 'Expo.easeInOut'
                    }, 0 )
        
                    .fromTo( this.dispSprite, 3, {
                        y: this.app.screen.height
                    }, {
                        y: 0,
                        ease: 'Power2.easeInOut'
                    }, 0.5)
        
                    .staggerFromTo( '.thumbs > div', 3, {
                        height: 0
                    }, {
                        height: '47%',
                        ease: 'Expo.easeInOut'
                    }, 0.1, 0.2 )
        
                    .staggerFromTo( '.thumbs > div img', 3, {
                        scale: 1.4
                    }, {
                        scale: 1,
                        ease: 'Expo.easeInOut'
                    }, 0.1, 0.2 )
              
                    .to( '.expand .square', 2, {
                        autoAlpha: 1,
                        ease: 'Expo.easeInOut'
                    }, 1)
        
                    .to( '.expand .grid', 2, {
                        autoAlpha: 0,
                        ease: 'Expo.easeInOut'
                    }, 1)
        
            }
        
            hideThumbs() {
        
                this.thumbsVisible = false;
                this.canvas.classList.remove('thumbs-visible');
        
                this.thumbsTl.reverse();
        
            }
        
            updateDot( right ) {
        
                let newActive = right ? this.slides.activeIndex + 2 : this.slides.activeIndex;
                document.querySelector('.dots > span.active').classList.remove('active');
                document.querySelector(`.dots > span:nth-child(${newActive})`).classList.add('active');
        
            }
        
        }
        
        let loader = new Loader();
        new Slider( document.getElementById('slider-canvas'), loader )
        
        return ()=>{
            window.PIXI.loader.reset();
        }
    },[])
    return (
        <>
            <div id="proMain">
                <Navbar props={props}/>
                <div id="loader">
                    <div className="greyy"></div>
                    <div className="whitey"></div>
                    <div className="text-wrap">
                        <div className="text">r<span>.</span></div>
                    </div>
                </div>
                <section id="slider">

                    <div id="canvas-holder">
                        <canvas id="slider-canvas"></canvas>
                        <div className="thumbs">
                            <div><img alt="Cover" src={Acc}/></div>
                            <div><img alt="Cover" src={Usage}/></div>
                            <div><img alt="Cover" src={about}/></div>
                        </div>
                <button className="expand">
                            <span>
                                <span className="grid">
                                    <span className="layer layer--primary">
                                        <span></span><span></span>
                                    </span>
                                    <span className="layer layer--secondary">
                                        <span></span><span></span>
                                    </span>
                                </span>
                                <span className="square"></span>
                            </span>
                        </button>
                    </div>

                    <article>

                        <div className="slide-count">
                            <span className="index">
                                <span className="next"></span>
                                <span className="current">01</span>
                            </span>
                            <span className="line"></span>
                            <span className="total">01</span>
                        </div>

                        <h1 className="slide-title">
                            <span className="code">
                                <span className="current">Account</span>
                                <span className="next"></span>
                            </span>
                            Details
                        </h1>

                        <div className="description">
                            <p className="next"></p>
                            <p className="current">
                                Name: {JSON.parse(localStorage.getItem("user")).name}<br/>Email: {JSON.parse(localStorage.getItem("user")).email}   
                            </p>
                        </div>
                        <div className="dots"></div>

                        <div className="slide-nav">
                            <button data-direction="prev" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 32.023201"><defs id="defs6">
                                    <clipPath id="clipPath18" clipPathUnits="userSpaceOnUse"><path id="path16" d="M 0,24.017 H 54 V 0 H 0 Z" />
                                    </clipPath></defs>
                                        <g transform="matrix(1.3333333,0,0,-1.3333333,0,32.0232)" id="g10">
                                            <g id="g12">
                                                <g clipPath="url(#clipPath18)" id="g14">
                                                    <g transform="translate(53,12.0086)" id="g20">
                                                        <path id="path22" d="m 0,0 c 0,0.267 -0.11,0.522 -0.293,0.714 l -9.899,9.999 c -0.391,0.395 -1.024,0.394 -1.414,0 -0.391,-0.394 -0.391,-1.034 0,-1.428 L -3.413,1.01 H -51 c -0.552,0 -1,-0.452 -1,-1.01 0,-0.558 0.448,-1.01 1,-1.01 h 47.586 l -8.192,-8.275 c -0.391,-0.394 -0.39,-1.034 0,-1.428 0.391,-0.394 1.024,-0.394 1.414,0 l 9.899,9.999 C -0.106,-0.525 -0.003,-0.265 0,0" />
                                                    </g>
                                                        <g transform="translate(53,12.0086)" id="g24">
                                                            <path id="path26" d="m 0,0 c 0,0.267 -0.11,0.522 -0.293,0.714 l -9.899,9.999 c -0.391,0.395 -1.024,0.394 -1.414,0 -0.391,-0.394 -0.391,-1.034 0,-1.428 L -3.413,1.01 H -51 c -0.552,0 -1,-0.452 -1,-1.01 0,-0.558 0.448,-1.01 1,-1.01 h 47.586 l -8.192,-8.275 c -0.391,-0.394 -0.39,-1.034 0,-1.428 0.391,-0.394 1.024,-0.394 1.414,0 l 9.899,9.999 C -0.106,-0.525 -0.003,-0.265 0,0 Z" />
                                                        </g>
                                                </g>
                                            </g>
                                        </g>
                                </svg>
                            </button>
                            <button data-direction="next">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 32.023201"><defs id="defs6">
                                    <clipPath id="clipPath18" clipPathUnits="userSpaceOnUse"><path id="path16" d="M 0,24.017 H 54 V 0 H 0 Z" />
                                    </clipPath></defs><g transform="matrix(1.3333333,0,0,-1.3333333,0,32.0232)" id="g10">
                                    <g id="g12">
                                        <g clipPath="url(#clipPath18)" id="g14">
                                            <g transform="translate(53,12.0086)" id="g20">
                                                <path id="path22" d="m 0,0 c 0,0.267 -0.11,0.522 -0.293,0.714 l -9.899,9.999 c -0.391,0.395 -1.024,0.394 -1.414,0 -0.391,-0.394 -0.391,-1.034 0,-1.428 L -3.413,1.01 H -51 c -0.552,0 -1,-0.452 -1,-1.01 0,-0.558 0.448,-1.01 1,-1.01 h 47.586 l -8.192,-8.275 c -0.391,-0.394 -0.39,-1.034 0,-1.428 0.391,-0.394 1.024,-0.394 1.414,0 l 9.899,9.999 C -0.106,-0.525 -0.003,-0.265 0,0" /></g><g transform="translate(53,12.0086)" id="g24"><path id="path26" d="m 0,0 c 0,0.267 -0.11,0.522 -0.293,0.714 l -9.899,9.999 c -0.391,0.395 -1.024,0.394 -1.414,0 -0.391,-0.394 -0.391,-1.034 0,-1.428 L -3.413,1.01 H -51 c -0.552,0 -1,-0.452 -1,-1.01 0,-0.558 0.448,-1.01 1,-1.01 h 47.586 l -8.192,-8.275 c -0.391,-0.394 -0.39,-1.034 0,-1.428 0.391,-0.394 1.024,-0.394 1.414,0 l 9.899,9.999 C -0.106,-0.525 -0.003,-0.265 0,0 Z" /></g></g></g></g>
                                </svg>
                            </button>
                        </div>

                    </article>

                    <div className="category white-text">rollab.</div>

                </section>
            </div>
        </>
    )
}

export default Profile
