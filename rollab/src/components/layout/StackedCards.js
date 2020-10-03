import React, { useEffect } from 'react';
import './stacked.css';
import Test from '../../images/Stats/sunny.png';
import Navbar from '../layout/Header';
import Sidebar from '../chatHome/Sidebar';
import M from 'materialize-css';
import Invite from '../popups/Invite';
import socketIOClient from 'socket.io-client';

const online = [
    {id: 1, game: "Battle-Ship", src:"", desc: "Can you guess where their ships are ?"},
    {id: 2, game: "DrawIO", src:"", desc: "Show off your artistic skills"},
    {id: 3, game: "MusLy", src:"", desc: "Finish those song lyrics!"},
]

const bot =  [
    {id: 4, game: "TinEye", src:"", desc: "Can you find the item from an image?"},
    {id: 5, game: "Battle-Ship", src:"", desc: "Can you guess where their ships are ?"},
    {id: 6, game: "BrainIt", src:"", desc: "Guess the movie using emojis!"},
    {id: 7, game: "Spacey", src:"", desc: "A fun interactive shooting space game!"},

]

var socket;
var joinStuff = 0;

const StackedCards = (props) => {
    const ENDPOINT = "http://localhost:1000";
    console.log(props)
    useEffect(()=>{
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log("Connected");
            socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
        });

        if(sessionStorage.getItem('game')){
            sessionStorage.clear();
        }

    }, []);
    const createGame = async (id) => {
        if(id === 1){

        }else if(id === 2){
            await socket.emit("createDrawio", { from: localStorage.getItem('id') }, (code)=>{
                sessionStorage.setItem('game', id);
                props.history.push(`/drawio/${code}`);
            })
        }else{

        }
    }

    const joinGame = async () => {
        let temp = document.querySelector("#game-code").value;
        if(temp){
            if(temp.length === 9){
                if(joinStuff === 1){
        
                }else if(joinStuff === 2){
                    props.history.push(`/drawio/${temp}`);
                }else{
        
                }
            }else{
                M.toast({ html: "Your game code has to be of 9 digits" })
            }
        }else{
            M.toast({ html: "Hold up partner! Let's have a game code first?" })
        }
    }

    const botGame = async (id) => {
        if(id === 4){

        }else if(id === 5){

        }else if(id === 6){

        }else{
            props.history.push('/spacey')
        }
    }
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
                                        <a onClick={()=>{
                                            createGame(ele.id);
                                        }}>CREATE</a>
                                        <a onClick={()=>{
                                            document.querySelector(".invi").style.display = "inherit";
                                            joinStuff = ele.id;
                                        }}>JOIN</a>
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
                                        <a onClick={()=>{
                                            botGame(ele.id);
                                        }}>PLAY</a>
                                    </div>
                                </article>
                                )
                            })
                        )
                    }
                </section>
            </div>
            <Invite join={joinGame}/>
        </>
    )
}

export default StackedCards
