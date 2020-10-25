import React, { useEffect, useState } from 'react';
import Sunny from '../../images/Stats/sunny.png';
import Rainy from '../../images/Stats/rainy.png';
import moment from 'moment';
import { key } from '../keys/key';


const Weather = () => {
    const [weather, setWeather] = useState({})
    useEffect(()=>{
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?id=1259229&units=metric&APPID=${key}`
        fetch(weatherURL)
            .then(res => res.json())
            .then(data =>{
                setWeather(data.list[0]);
            })
            
    })
    return (
        <>
        {
            weather.weather ? 
                <div className="col s12 m5">
                    <div className="card" style={{borderRadius:"24px"}}>
                        <div className="card-image">
                            <img alt="weather" src={weather.weather[0].main === "Clear" ? Sunny : Rainy} style={{borderRadius:"24px"}}/>
                            <span className="card-title flow-text">
                                {weather.main.temp}°C
                                <br/>
                                As of {moment(weather.dt_txt).fromNow()}
                                <br />
                                <span style={{fontSize:"14px", color: "yellow"}}>
                                    Feels like {weather.main.feels_like} | Humidity {weather.main.humidity} | Pressure {weather.main.pressure} Pa
                                </span>
                            </span>
                        </div>
                     </div>
                </div>
            : 
            null
        }
        </>
    )
}

export default Weather
