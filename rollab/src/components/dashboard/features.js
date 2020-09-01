import React from 'react';
import Fonty from './Fonty';
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


const Features=()=> {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    return (
        <div>
            <Fonty />
            <div className="container" style={{
                "marginTop":"60px",
            }}>
            <div className="row">
                <div className="col s12">
                    <div className="card-panel" style={{
                        background:"#ee6e6e",
                        borderRadius: "24px 24px 0 0"
                    }}>
                        <span className="white-text">
                            <h4>
                                Learn What's New...
                            </h4>
                        </span>
                    </div>
                </div>
                <div
                className="row container center featTab" >
                    <h3 className="header flow-text postTitle col s12 center">
                        Expand Your Reach!
                    </h3>
                    {/* <img src={ feature1 } alt="feature 1" className="featImg col s8 offset-s2 l6 push-l6 responsive-img"/> */}
                    <animated.div
                        className="hovered1 col s10 offset-s1"
                        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                        style={{ transform: props.xys.interpolate(trans) }}
                    />
                    <p className="grey-text text-darken-3 lighten-3 col s10 offset-s1 center"
                        style={{
                            marginTop: "30px"
                        }}
                    >
                        Connect to anyone around the world, that too for free!
                    </p>
                </div>

                <hr />
                <div
                className="row container center featTab" >
                    <h3 className="header flow-text postTitle col s12 center">
                        Work and Game with anyone and anytime!
                    </h3>
                    {/* <img src={ feature1 } alt="feature 1" className="featImg col s8 offset-s2 l6 push-l6 responsive-img"/> */}
                    <animated.div
                        className="hovered2 col s10 offset-s1"
                        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                        style={{ transform: props.xys.interpolate(trans) }}
                    />
                    <p className="grey-text text-darken-3 lighten-3 col s10 offset-s1 center"
                        style={{
                            marginTop: "30px"
                        }}
                    >
                        Talk it like I play it, play it like I chat it...
                    </p>
                </div>

                <hr />
                <div
                className="row container center featTab" >
                    <h3 className="header flow-text postTitle col s12 center">
                        No one online? We gotchya!
                    </h3>
                    {/* <img src={ feature1 } alt="feature 1" className="featImg col s8 offset-s2 l6 push-l6 responsive-img"/> */}
                    <animated.div
                        className="hovered3 col s10 offset-s1"
                        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                        style={{ transform: props.xys.interpolate(trans) }}
                    />
                    <p className="grey-text text-darken-3 lighten-3 col s10 offset-s1 center"
                        style={{
                            marginTop: "30px"
                        }}
                    >
                        Our Chatbot always pays attention to you without judging you
                        <span><i>(unlike some snake friends shhh...)</i></span>
                    </p>
                </div>
                
                <div className="col s12">
                    <div className="card-panel" style={{
                        background:"#ee6e6e",
                        borderRadius: "0 0 24px 24px"
                    }}>
                        <span className="white-text">
                            <h6>
                                and much more. Explore yourself...
                            </h6>
                        </span>
                    </div>
                </div>
                
            </div>
            </div>
        </div>
    )
}

export default Features
