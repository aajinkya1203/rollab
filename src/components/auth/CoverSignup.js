import React, { useEffect } from 'react'
import Particles from 'react-particles-js';
// import { useTrail, animated } from 'react-spring'

// const fast = { tension: 1200, friction: 40 }
// const slow = { mass: 10, tension: 200, friction: 50 }
// const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

// const Cover=()=> {
//   const [trail, set] = useTrail(3, () => ({ xy: [0, 0], config: i => (i === 0 ? fast : slow) }))
//   return (
//     <>
//       <svg style={{ position: 'absolute', width: 0, height: 0 }}>
//         <filter id="goo">
//           <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
//           <feColorMatrix in="blur" values="1 0 0 1 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7" />
//         </filter>
//       </svg>
//       <div className="hooks-main" onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}>
//         {trail.map((props, index) => (
//           <animated.div key={index} style={{ transform: props.xy.interpolate(trans) }} />
//         ))}
//       </div>
//     </>
//   )
// }

// export default Cover;


function CoverSignup() {

  return (
    <div
      style={{
        position: "absolute",
        top: '90px',
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <Particles 
        params={
          {
            "particles": {
              "number": {
                "value": 120,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "window",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "grab"
                },
                "onclick": {
                  "enable": true,
                  "mode": "repulse"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 200,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }
        }
      />
    </div>
  )
}

export default CoverSignup

