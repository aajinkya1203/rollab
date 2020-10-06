import React, { useEffect } from 'react'
import { getLyrics } from 'genius-lyrics-api';
import { apiKey } from '../../keys/key';
import { split } from 'lodash';

const Musly = () => {
    useEffect(()=>{
        const options = {
            apiKey,
            title: 'blinding lights',
            artist: '',
            optimizeQuery: true
        };
        getLyrics(options).then((lyrics)=>{
            console.log(lyrics)
            console.log(lyrics.length)
            lyrics = split(lyrics, "\n");
            
        })
    }, [])
    return (
        <div>
            Hello
        </div>
    )
}

export default Musly
