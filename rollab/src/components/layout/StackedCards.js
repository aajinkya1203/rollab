import React from 'react';
import './stacked.css';
import Test from '../../images/Stats/sunny.png';
import Navbar from '../layout/Header';
import Sidebar from '../chatHome/Sidebar';

const online = [
    {id: 1, game: "Battle-Ship", src:"", desc: "Can you guess where their ships are ?"},
    {id: 2, game: "DrawIO", src:"", desc: "Show off your artistic skills"},
    {id: 3, game: "MusLy", src:"", desc: "Finish those song lyrics!"},
]

const bot =  [
    {id: 4, game: "TinEye", src:"", desc: "Can you find the item from an image?"},
    {id: 5, game: "Battle-Ship", src:"", desc: "Can you guess where their ships are ?"},
    {id: 6, game: "BrainIt ", src:"", desc: "Guess the movie using emojis!"},

]

const StackedCards = (props) => {
    console.log(props);
    return (
        <>
            <Navbar />
            <div id="stati" className="row">
                <Sidebar />
                <section className="cardy-listy">
                    {
                        props && props.location.pathname === "/game/online" ? (

                            online.map(ele=>{
                                return(
                                    <article className="cardy" key={ele.id}>
                                    <header className="cardy-header turny" style={{backgroundColor:"#17141d"}}>
                                        <p className="white-text">Game:</p>
                                        <h2>{ele.game}</h2>
                                    </header>
            
                                    <div className="cardy-author">
                                        <a className="author-avatar" href="#">
                                            <img src={Test} />
                                        </a>
                                        <svg className="half-circle turnz" viewBox="0 0 106 57">
                                            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                                        </svg>
            
                                        <div className="author-name white-text">
                                            {ele.desc} 
                                        </div>
                                    </div>
                                    <div className="tagsy">
                                        <a href="#">PLAY</a>
                                    </div>
                                </article>
                                )
                            })
                        ) : (
                            bot.map(ele=>{
                                return(
                                    <article className="cardy" key={ele.id}>
                                    <header className="cardy-header" style={{backgroundColor:"#FFA100"}}>
                                        <p className="white-text">Game:</p>
                                        <h2>{ele.game}</h2>
                                    </header>
            
                                    <div className="cardy-author">
                                        <a className="author-avatar" href="#">
                                            <img src={Test} />
                                        </a>
                                        <svg className="half-circle" viewBox="0 0 106 57">
                                            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                                        </svg>
            
                                        <div className="author-name white-text">
                                            {ele.desc} 
                                        </div>
                                    </div>
                                    <div className="tagsy">
                                        <a href="#">PLAY</a>
                                    </div>
                                </article>
                                )
                            })
                        )
                    }
                </section>
            </div>
        </>
    )
}

export default StackedCards
