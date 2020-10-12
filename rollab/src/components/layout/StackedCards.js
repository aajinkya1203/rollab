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
    // {id: 4, game: "TinEye", src:"", desc: "Can you find the item from an image?"},
    {id: 5, game: "Battle-Ship", src:"", desc: "Can you guess where their ships are ?"},
    // {id: 6, game: "BrainIt", src:"", desc: "Guess the movie using emojis!"},
    {id: 7, game: "Spacey", src:"", desc: "A fun interactive shooting space game!"},

]

var socket;
var joinStuff = 0;

const StackedCards = (props) => {
    const ENDPOINT = "http://localhost:1000";
    console.log(props)
    useEffect(()=>{
        if(!localStorage.getItem("id")){
            props.history.push("/");
        }
        socket = socketIOClient(ENDPOINT);
        // on connection
        socket.once('connect',()=>{
            console.log("Connected");
            socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
        });

        socket.on('comm', (data)=>{
            let yout = `
            <blockquote class="valign-wrapper notif-notif">
                <span class="material-icons">
                    notification_important
                </span>
                ${data.sender.name} has sent you a message
            </blockquote>
            `;
            document.querySelector('#notif-logs').innerHTML += yout;
            document.querySelector("#rFAB").classList.add("pulse");
        })

        socket.on('invitation', data=>{
            let yout = `
            <blockquote class="valign-wrapper invi-notif">
                <span class="material-icons">
                    notification_important
                </span>
                ${data}
            </blockquote>
            `;
            document.querySelector('#notif-logs').innerHTML += yout;
            document.querySelector("#rFAB").classList.add("pulse");
            
        })

        if(sessionStorage.getItem('game')){
            sessionStorage.clear();
        }
        return ()=>{
            // disconnecting this when it unmounts
            console.log("Dismounting");
            socket.emit('disconnect');
            // disposing instance of the socket var
            socket.off();
        }

    }, []);
    const createGame = (id) => {
        if(id === 1){
            props.history.push('/online/battleship');
        }else if(id === 2){
            console.log("yo", socket);
            socket.emit("createDrawio", { from: localStorage.getItem('id') }, (code)=>{
                console.log(code);
                sessionStorage.setItem('game', id);
                props.history.push(`/drawio/${code}`);
            })
        }else{
            socket.emit("createMusly", { from: localStorage.getItem('id') }, (code)=>{
                sessionStorage.setItem('game', id);
                props.history.push(`/musly/${code}`);
            })
        }
    }

    const joinGame = async () => {
        let temp = document.querySelector("#game-code").value;
        if(temp){
            if(temp.length === 9){
                if(joinStuff === 1){
                    props.history.push("/online/battleship");
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
            props.history.push('/solo/battleship')
        }else if(id === 6){

        }else{
            props.history.push('/spacey')
        }
    }
    return (
        <>
            <Navbar props={props}/>
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
                                        <a className="author-avatar" href="#!">
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
                                        <a href="#!" onClick={()=>{
                                            createGame(ele.id);
                                        }}>CREATE</a>
                                        <a href="#!" onClick={()=>{
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
                                        <a className="author-avatar" href="#!">
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
                                        <a href="#!" onClick={()=>{
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
