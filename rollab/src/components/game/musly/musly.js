import React, { useEffect } from 'react'
import { getLyrics } from 'genius-lyrics-api';
import { apiKey } from '../../keys/key';

const Musly = () => {
    useEffect(()=>{
        const options = {
            apiKey,
            title: 'Blinding Lights',
            artist: '',
            optimizeQuery: true
        };
        getLyrics(options).then((lyrics)=>{
            console.log(lyrics)
        })
    }, [])
    return (
        <div>
            Hello
        </div>
    )
}

export default Musly
