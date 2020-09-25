import React, { useEffect } from 'react';
import './news.scss';

const News = () => {
    useEffect(()=>{
        const swiper = new window.Swiper('.swiper-container', {
            direction: 'vertical',
            mousewheel: {},
            effect: 'cube',
            keyboard: {
              enabled: true,
              onlyInViewport: false
            }
          });
    })
    return (
        <div class="swiper-container"> 
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="container-general">
                        <div class="gallery-wrap wrap-effect-1">
                            <div class="item"></div>
                            <div class="item"></div>
                            <div class="item"></div>
                            <div class="item"></div>
                            <div class="item"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News
