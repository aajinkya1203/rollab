import React, { useEffect } from 'react';
import './battle.css';
import socketIOClient from 'socket.io-client';
import M from 'materialize-css';
import Navbar from '../../layout/Header';



var socket;

let gameMode = 'multiPlayer';
const MultiBattle = (props) => {
    // const ENDPOINT = "http://localhost:1000";

    useEffect(()=>{
        if(!localStorage.getItem("id")){
            props.history.push("/");
            M.toast({ html: "You must be authenticated!" })
        }
        socket = socketIOClient();
        // on connection
        socket.once('connect',()=>{
            console.log("Connected");
            socket.emit('newUser', { id: localStorage.getItem('id'), name: JSON.parse(localStorage.getItem("user")).name }, ()=>{})
        });

        socket.emit('battleship');

        const userGrid = document.querySelector('.grid-user')
        const computerGrid = document.querySelector('.grid-computer')
        const displayGrid = document.querySelector('.grid-display')
        const ships = document.querySelectorAll('.ship')
        const destroyer = document.querySelector('.destroyer-container')
        const submarine = document.querySelector('.submarine-container')
        const cruiser = document.querySelector('.cruiser-container')
        const battleship = document.querySelector('.battleship-container')
        const carrier = document.querySelector('.carrier-container')
        const startButton = document.querySelector('#start')
        const rotateButton = document.querySelector('#rotate')
        const turnDisplay = document.querySelector('#whose-go')
        const infoDisplay = document.querySelector('#info')
        const setupButtons = document.getElementById('setup-buttons')
        const userSquares = []
        const computerSquares = []
        let isHorizontal = true
        let isGameOver = false
        let currentPlayer = 'user'
        const width = 10
        let playerNum = 0
        let ready = false
        let enemyReady = false
        let allShipsPlaced = false
        let shotFired = -1
        //Ships
        const shipArray = [
          {
            name: 'destroyer',
            directions: [
              [0, 1],
              [0, width]
            ]
          },
          {
            name: 'submarine',
            directions: [
              [0, 1, 2],
              [0, width, width*2]
            ]
          },
          {
            name: 'cruiser',
            directions: [
              [0, 1, 2],
              [0, width, width*2]
            ]
          },
          {
            name: 'battleship',
            directions: [
              [0, 1, 2, 3],
              [0, width, width*2, width*3]
            ]
          },
          {
            name: 'carrier',
            directions: [
              [0, 1, 2, 3, 4],
              [0, width, width*2, width*3, width*4]
            ]
          },
        ]
      
        createBoard(userGrid, userSquares)
        createBoard(computerGrid, computerSquares)
      
        // Select Player Mode
        if (gameMode === 'singlePlayer') {
        //   startSinglePlayer()
        } else {
          startMultiPlayer()
        }
      
        // multiplayer logic
        function startMultiPlayer() {
        
            // Get your player number
            socket.on('player-number', num => {
              if (num === -1) {
                infoDisplay.innerHTML = "Sorry, the server is full"
              } else {
                playerNum = parseInt(num)
                if(playerNum === 1) currentPlayer = "enemy"
        
                console.log(playerNum)
        
                // Get other player status
                socket.emit('check-players')
              }
            })
        
            // Another player has connected or disconnected
            socket.on('player-connection', num => {
              console.log(`Player number ${num} has connected or disconnected`)
              playerConnectedOrDisconnected(num)
            })
        
            // On enemy ready
            socket.on('enemy-ready', num => {
              enemyReady = true
              playerReady(num)
              if (ready) {
                playGameMulti(socket)
                setupButtons.style.display = 'none'
              }
            })
        
            // Check player status
            socket.on('check-players', players => {
              players.forEach((p, i) => {
                if(p.connected) playerConnectedOrDisconnected(i)
                if(p.ready) {
                  playerReady(i)
                  if(i !== playerReady) enemyReady = true
                }
              })
            })
        
            // On Timeout
            socket.on('timeout', () => {
              infoDisplay.innerHTML = 'You have reached the 10 minute limit'
            })
        
            // Ready button click
            startButton.addEventListener('click', () => {
              if(allShipsPlaced) playGameMulti(socket)
              else infoDisplay.innerHTML = "Please place all ships"
            })
        
            // Setup event listeners for firing
            computerSquares.forEach(square => {
              square.addEventListener('click', () => {
                if(currentPlayer === 'user' && ready && enemyReady) {
                  shotFired = square.dataset.id
                  socket.emit('fire', shotFired)
                }
              })
            })
        
            // On Fire Received
            socket.on('fire', id => {
              enemyGo(id)
              const square = userSquares[id]
              socket.emit('fire-reply', square.classList)
              playGameMulti(socket)
            })
        
            // On Fire Reply Received
            socket.on('fire-reply', classList => {
              revealSquare(classList)
              playGameMulti(socket)
            })
        
            function playerConnectedOrDisconnected(num) {
              let player = `.p${parseInt(num) + 1}`
              document.querySelector(`${player} .connected`).classList.toggle('active')
              if(parseInt(num) === playerNum) document.querySelector(player).style.fontWeight = 'bold'
            }
          }
        


      
        //Create Board
        function createBoard(grid, squares) {
          for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.dataset.id = i
            grid.appendChild(square)
            squares.push(square)
          }
        }
      
        
      
        //Rotate the ships
        function rotate() {
          if (isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = false
            // console.log(isHorizontal)
            return
          }
          if (!isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = true
            // console.log(isHorizontal)
            return
          }
        }
        rotateButton.addEventListener('click', rotate)
      
        //move around user ship
        ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
        userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
        userSquares.forEach(square => square.addEventListener('dragover', dragOver))
        userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
        userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
        userSquares.forEach(square => square.addEventListener('drop', dragDrop))
        userSquares.forEach(square => square.addEventListener('dragend', dragEnd))
      
        let selectedShipNameWithIndex
        let draggedShip
        let draggedShipLength
      
        ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
          selectedShipNameWithIndex = e.target.id
          // console.log(selectedShipNameWithIndex)
        }))
      
        function dragStart() {
          draggedShip = this
          draggedShipLength = this.childNodes.length
          // console.log(draggedShip)
        }
      
        function dragOver(e) {
          e.preventDefault()
        }
      
        function dragEnter(e) {
          e.preventDefault()
        }
      
        function dragLeave() {
          // console.log('drag leave')
        }
      
        function dragDrop() {
            try{
                let shipNameWithLastId = draggedShip.lastChild.id
                let shipClass = shipNameWithLastId.slice(0, -2)
                // console.log(shipClass)
                let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
                let shipLastId = lastShipIndex + parseInt(this.dataset.id)
                // console.log(shipLastId)
                const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
                const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
                
                let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
                let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)
                  
                let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
            
                shipLastId = shipLastId - selectedShipIndex
                // console.log(shipLastId)
            
                if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
                  for (let i=0; i < draggedShipLength; i++) {
                    let directionClass
                    if (i === 0) directionClass = 'start'
                    if (i === draggedShipLength - 1) directionClass = 'end'
                    userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
                  }
                //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
                //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
                } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
                  for (let i=0; i < draggedShipLength; i++) {
                    let directionClass
                    if (i === 0) directionClass = 'start'
                    if (i === draggedShipLength - 1) directionClass = 'end'
                    userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', 'vertical', directionClass, shipClass)
                  }
                } else return
            
                displayGrid.removeChild(draggedShip)
                if(!displayGrid.querySelector('.ship')) allShipsPlaced = true
            }catch(e){
                //console.log("Improper placement")
            }
        }
      
        function dragEnd() {
          // console.log('dragend')
        }
      
        // Game Logic for MultiPlayer
        function playGameMulti(socket) {
          setupButtons.style.display = 'none'
          if(isGameOver) return
          if(!ready) {
            socket.emit('player-ready')
            ready = true
            playerReady(playerNum)
          }
      
          if(enemyReady) {
            if(currentPlayer === 'user') {
              turnDisplay.innerHTML = 'Your Go'
            }
            if(currentPlayer === 'enemy') {
              turnDisplay.innerHTML = "Enemy's Go"
            }
          }
        }
      
        function playerReady(num) {
            try{
                let player = `.p${parseInt(num) + 1}`
                document.querySelector(`${player} .ready`).classList.toggle('active')
            }catch(e){
                //console.log("Error", e);
            }
        }
      
        // Game Logic for Single Player
        function playGameSingle() {
            try{
                if (isGameOver) return
                if (currentPlayer === 'user') {
                  turnDisplay.innerHTML = 'Your Go'
                  computerSquares.forEach(square => square.addEventListener('click', function(e) {
                    shotFired = square.dataset.id
                    revealSquare(square.classList)
                  }))
                }
                if (currentPlayer === 'enemy') {
                  turnDisplay.innerHTML = 'Computers Go'
                  setTimeout(enemyGo, 1000)
                }
            }catch(e){
                // console.log("Error", e)
            }
        }
      
        let destroyerCount = 0
        let submarineCount = 0
        let cruiserCount = 0
        let battleshipCount = 0
        let carrierCount = 0
      
        function revealSquare(classList) {
            try{
                const enemySquare = computerGrid.querySelector(`div[data-id='${shotFired}']`)
                const obj = Object.values(classList)
                if (!enemySquare.classList.contains('boom') && currentPlayer === 'user' && !isGameOver) {
                  if (obj.includes('destroyer')) destroyerCount++
                  if (obj.includes('submarine')) submarineCount++
                  if (obj.includes('cruiser')) cruiserCount++
                  if (obj.includes('battleship')) battleshipCount++
                  if (obj.includes('carrier')) carrierCount++
                }
                if (obj.includes('taken')) {
                  enemySquare.classList.add('boom')
                } else {
                  enemySquare.classList.add('miss')
                }
                checkForWins()
                currentPlayer = 'enemy'
                if(gameMode === 'singlePlayer') playGameSingle()
            }catch(e){
                // console.log("Error", e)
            }
        }
      
        let cpuDestroyerCount = 0
        let cpuSubmarineCount = 0
        let cpuCruiserCount = 0
        let cpuBattleshipCount = 0
        let cpuCarrierCount = 0
      
      
        function enemyGo(square) {
          if (gameMode === 'singlePlayer') square = Math.floor(Math.random() * userSquares.length)
          if (!userSquares[square].classList.contains('boom')) {
            const hit = userSquares[square].classList.contains('taken')
            userSquares[square].classList.add(hit ? 'boom' : 'miss')
            if (userSquares[square].classList.contains('destroyer')) cpuDestroyerCount++
            if (userSquares[square].classList.contains('submarine')) cpuSubmarineCount++
            if (userSquares[square].classList.contains('cruiser')) cpuCruiserCount++
            if (userSquares[square].classList.contains('battleship')) cpuBattleshipCount++
            if (userSquares[square].classList.contains('carrier')) cpuCarrierCount++
            checkForWins()
          } else if (gameMode === 'singlePlayer') enemyGo()
          currentPlayer = 'user'
          turnDisplay.innerHTML = 'Your Go'
        }
      
        function checkForWins() {
            try{

                let enemy = 'computer'
                if(gameMode === 'multiPlayer') enemy = 'enemy'
                if (destroyerCount === 2) {
                  infoDisplay.innerHTML = `You sunk the ${enemy}'s destroyer`
                  destroyerCount = 10
                }
                if (submarineCount === 3) {
                  infoDisplay.innerHTML = `You sunk the ${enemy}'s submarine`
                  submarineCount = 10
                }
                if (cruiserCount === 3) {
                  infoDisplay.innerHTML = `You sunk the ${enemy}'s cruiser`
                  cruiserCount = 10
                }
                if (battleshipCount === 4) {
                  infoDisplay.innerHTML = `You sunk the ${enemy}'s battleship`
                  battleshipCount = 10
                }
                if (carrierCount === 5) {
                  infoDisplay.innerHTML = `You sunk the ${enemy}'s carrier`
                  carrierCount = 10
                }
                if (cpuDestroyerCount === 2) {
                  infoDisplay.innerHTML = `${enemy} sunk your destroyer`
                  cpuDestroyerCount = 10
                }
                if (cpuSubmarineCount === 3) {
                  infoDisplay.innerHTML = `${enemy} sunk your submarine`
                  cpuSubmarineCount = 10
                }
                if (cpuCruiserCount === 3) {
                  infoDisplay.innerHTML = `${enemy} sunk your cruiser`
                  cpuCruiserCount = 10
                }
                if (cpuBattleshipCount === 4) {
                  infoDisplay.innerHTML = `${enemy} sunk your battleship`
                  cpuBattleshipCount = 10
                }
                if (cpuCarrierCount === 5) {
                  infoDisplay.innerHTML = `${enemy} sunk your carrier`
                  cpuCarrierCount = 10
                }
                console.log(destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount)
                if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
                  infoDisplay.innerHTML = "YOU WIN"
                  gameOver()
                }
                if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
                  infoDisplay.innerHTML = `${enemy.toUpperCase()} WINS`
                  gameOver()
                }
            }catch(e){
                console.log("Error", e);
            }
        }
      
        function gameOver() {
            try{
                isGameOver = true
                startButton.removeEventListener('click', playGameSingle)
            }catch(e){
                // console.log("Error", e)
            }
        }
      
        return ()=>{
          // disconnecting this when it unmounts
          console.log("Dismounting");
          socket.emit('disconnect');
          // disposing instance of the socket var
          socket.off();
        }
    }, []);
    
    return (
        <>
            <Navbar props={props} />
            <div>
                <div className="container-battle">
                    <div className="player p1">
                        Player 1
                        <div className="connected">Connected</div>
                        <div className="ready">Ready</div>
                    </div>
                    
                    <div className="player p2">
                        Player 2
                        <div className="connected">Connected</div>
                        <div className="ready">Ready</div>
                    </div>
                    </div>

                    <div className="container-battle">
                    <div className="battleship-grid grid-user"></div>
                    <div className="battleship-grid grid-computer"></div>
                    </div>

                    <div className="container-battle hidden-info">
                    <div className="setup-buttons" id="setup-buttons">
                        <button id="start" className="btn-battle">Start Game</button>
                        <button id="rotate" className="btn-battle">Rotate Your Ships</button>
                    </div>
                    <h3 id="whose-go" className="info-text">Your Go</h3>
                    <h3 id="info" className="info-text"></h3>
                    </div>

                <div className="container-battle">
                    <div className="grid-display">
                        <div className="ship destroyer-container" draggable="true"><div id="destroyer-0"></div><div id="destroyer-1"></div></div>
                        <div className="ship submarine-container" draggable="true"><div id="submarine-0"></div><div id="submarine-1"></div><div id="submarine-2"></div></div>
                        <div className="ship cruiser-container" draggable="true"><div id="cruiser-0"></div><div id="cruiser-1"></div><div id="cruiser-2"></div></div>
                        <div className="ship battleship-container" draggable="true"><div id="battleship-0"></div><div id="battleship-1"></div><div id="battleship-2"></div><div id="battleship-3"></div></div>
                        <div className="ship carrier-container" draggable="true"><div id="carrier-0"></div><div id="carrier-1"></div><div id="carrier-2"></div><div id="carrier-3"></div><div id="carrier-4"></div></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MultiBattle
