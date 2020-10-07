const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/Schema');
const cors = require('cors');
const { URI } = require('./keys/keys');
var socket = require('socket.io');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Groups = require('./models/Group');
const words = require('./constants')

// used for making room id
const compareFunc = (a, b) => {
    return ('' + a).localeCompare(b,'en', { numeric: true });
}

const app = express();


app.use(cors());
app.use( bodyParser.json() );

// having options to connect to the db
options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}

// connecting to the db
mongoose.connect(URI, options);

// adding event listeners
mongoose.connection.once('connected', ()=>{
    console.log("Connected to the Database!");
}).on('error', ()=>{
    console.log("Error connecting to the Database!");
});

// graphql route
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

// listening on port
PORT = process.env.PORT || 1000;
const server = app.listen(PORT, ()=>{
    console.log("Listening to requests on port", PORT);
})

var io = socket(server);

// server db for keeping a record of users and sockets
const users = {};
const priv = {};
const groups = {};
var myGroups = {};
var drawio = {};
const codes = {};

io.on('connection',(socket)=>{

    // when user disconnects
    socket.on('disconnect', (test)=>{
        removeFromExistingRooms(socket.nick, myGroups[socket.nick])
        io.emit('delStat', { id: socket.nick });
        const temp = removeUser(socket.nick);
        console.log("Temp:",temp);
        if(temp){
            console.log("User has disconnected!");
        }else{
            console.log("User wasn't present!")
        }

    });

    // typing feature here
    socket.on('typing', (data, callback) => {
        io.emit('updateStat', { id: data.from });
        let tempto = [data.from, data.to].sort(compareFunc);
        let roomId = jwt.sign(tempto[0], tempto[1]);
        if(roomExist(roomId)){
            let result = {
                msgFormat: `${data.name} is typing`,
                source: data.from,
            }
            socket.to(roomId).emit('type', result);
            callback(true);
        }else{
            callback(false);
        }
    });

    // creating a drawio room
    socket.on('createDrawio', (data, callback) => {
        roomCode = Math.floor(100000000 + Math.random() * 900000000);
        users[data.from].join(roomCode);
        drawio[roomCode] = data.from;
        callback(roomCode);
    });
    socket.on('start',(data)=>{
        let game = _.sample(words);
        codes[data.room] = game;
        io.in(data.room).emit("nextWord", game);
    });


    socket.on('joinGame', (data, callback) => {
        if(data.room in codes){
            console.log("Match in progress!");
            callback(414);
        }else{
            if(data.room in drawio){
                try{
                    var clientele = io.sockets.adapter.rooms[data.room].sockets;   
                    let temp = []
                    for (var clientId in clientele ) {
    
                        //this is the socket of each client in the room.
                        var clientSocket = io.sockets.connected[clientId];
                        temp.push(clientSocket.id);
                    }
                    if(temp.includes(users[data.from].id)){
                        console.log("Its the host!");
                        callback(false);
                    }else{
                        console.log("User in in!")
                        users[data.from].join(data.room);
                        let opt = [
                            `${socket.user} has joined the game!`,
                            `Fasten your seat belts, ${socket.user} has arrived!`,
                            `Goddamn! ${socket.user} has blessed the lobby!`,
                            `${socket.user} is finally here. Now we talking!`,
                            `Alright, ${socket.user} has now made the game interesting!`,
                            `${socket.user} we hope you bought some snacks.`,
                            `Kaboom! ${socket.user} is here!.`,
                            `Beep boop boop beep! ${socket.user} is here to bag a win!.`,
                            
                        ]
                        io.in(data.room).emit("announce", _.sample(opt));
                        callback(true);
                    }
                }catch(err){
                    // console.log("Error")
                }
            }else{
                console.log("Invalid game code!")
                callback(609);
            }
            try{
                
                var clients = io.sockets.adapter.rooms[data.room].sockets;   
                let names = []
                for (var clientId in clients ) {
    
                    //this is the socket of each client in the room.
                    var clientSocket = io.sockets.connected[clientId];
                    names.push(clientSocket.user);
                }
                io.in(data.room).emit('allParticipants', [...new Set(names)]);
            }catch(err){
                // console.log("Error")
            }
        }
    });

    // game invi
    socket.on('share', (data, callback)=>{
        console.log(data);
        for (var i in data){
            if( i in users){
                console.log("Log", users[i].id);
                io.to(users[i].id).emit('invitation', `Hello there! You've been invited to a game of DrawIO by ${users[i].user}. Follow this link: /drawio/1234213`);
            }
        }
    })

    socket.on('gameChat', (data, callback) => {
        if(data.msg.substring(0, 3) === "/a-"){
            if(codes[data.room] === data.msg.substring(3, data.msg.length)){
                io.in(data.room).emit('success', `${socket.user} has guessed it right!`);
            }else{
                io.in(data.room).emit('fail', `${socket.user}, your guess is wrong!`);
            }
        }else{
            io.in(data.room).emit('gameChat', {msg: data.msg, name: socket.user});
        }
    })

    // leaving a drawio room
    socket.on('leaveDrawio', (data, callback) => {
        try{

            users[data.from].leave(data.room);
            if(drawio[data.room] == data.from){
                socket.to(data.room).emit('deleteGame', { data: "The host has left the game! Return to the main menu." });
                delete drawio[data.room];
                delete codes[data.room];
                callback(true);
            }else{
                try{
                    var clients = io.sockets.adapter.rooms[data.room].sockets;   
                    let names = []
                    for (var clientId in clients ) {
        
                        //this is the socket of each client in the room.
                        var clientSocket = io.sockets.connected[clientId];
                        names.push(clientSocket.user);
                    }
                    io.in(data.room).emit('allParticipants', [...new Set(names)]);
                }catch(err){
                    // console.log("Error caught")
                }
    
            }
            callback(false);
        }catch(err){
            callback(false);
        }
    })

    // drawing feature
    socket.on('drawing', (data) => socket.to(data.room).emit('drawing', data));

    // typing feature for GROUPS
    socket.on('typing-grp', (data, callback) => {
        if(data.room in groups){
            let result = {
                msgFormat: `${socket.user} is typing`,
                source: socket.nick,
                room: data.room,
            }
            socket.to(data.room).emit('typed-g', result);
            callback(true);
        }else{
            callback(false);
        }
    });

    // stop typing feature here
    socket.on('stop-typing', (data, callback) => {
        io.emit('updateStat', { id: data.from });
        let tempto = [data.from, data.to].sort(compareFunc);
        let roomId = jwt.sign(tempto[0], tempto[1]);
        if(roomExist(roomId)){
            socket.to(roomId).emit('stop-type');
            callback(true);
        }else{
            callback(false);
        }
    });

    // stop typing feature here
    socket.on('stop-typing-g', (data, callback) => {
        if(data.room in groups){
            socket.to(data.room).emit('stop-type');
            callback(true);
        }else{
            callback(false);
        }
    });

    // added private chat logic here
    socket.on('sendPriv', (data, callback)=>{
        io.emit('updateStat', { id: data.from });
        let tempto = [data.from, data.to].sort(compareFunc);
        let roomId = jwt.sign(tempto[0], tempto[1]);
        if(roomExist(roomId,data.from, data.to)){
            let msgFormat = {
                "sender": {
                    "name": data.name,
                    "_id":data.from,
                    "__typename": "User"
                },
                "time": data.time,
                "text": data.message,
                "bonus": [tempto[0], tempto[1]]
            }
            io.in(roomId).emit('comm', msgFormat);
            // console.log("Room exiists")
            callback(true);
        }else{
            callback(false);
        }
    });

    // sending to a group
    // need to take in from, room
    socket.on('sendGroup', (data)=>{
        // io.emit('updateStat', { id: socket.nick });
        // console.log(data);
        let obj = {
            "sender": {
                "name": socket.user,
                "_id": socket.nick,
                "__typename": "User"
            },
            "text": data.message,
            "room": data.room,
            "time": data.time,
            "type": "message",
        }
        io.in(data.room).emit('joinedChat', obj);
    })


    // join priv chat room for personal DM
    socket.on('privChat', (data)=>{
        io.emit('updateStat', { id: data.from });
        
        let tempto = [data.from, data.to].sort(compareFunc);
        let roomId = jwt.sign(tempto[0], tempto[1]);
        if(users[tempto[0]] && users[tempto[1]]){
            priv[roomId] = [tempto[0], tempto[1]];
            // console.log("Room made!",priv);
            users[tempto[0]].join(roomId);
            users[tempto[1]].join(roomId);
            // console.log("\nAll users are in!");
            // console.log(roomId);
            // console.log("PrivRoom",priv[roomId]);
        }else{
            console.log("Try One of the user isn't online!");
        }
    })

    // join a group on tapping the button
    socket.on('group', async (data)=>{
        // console.log("Groups:",groups)
        if(data.room in groups){

            users[data.id].join(data.room);
            // let obj= {
            //     id: data.room,
            //     msg: `${data.name} has joined the chat`,
            //     type: "notif",
            // }
            // console.log("Roomsy:", data.room)
            // socket.to(data.room).emit('joinedChat', obj);
            // console.log("\nRoom already present!");
            // console.log("\n\nRoom",groups[data.room]);
        }else{
            groups[data.room] = "Test";
            users[data.id].join(data.room);
            if(myGroups[socket.nick]){
                for(i = 0; i < myGroups[socket.nick].length; ++i){
                    if(data.room == myGroups[socket.nick][i]._id){
                        // console.log("Same!")
                        let members = myGroups[socket.nick][i].members;
                        // get all clients in this room
                    //     var clients = io.sockets.adapter.rooms[data.room].sockets;
                    //     var joinedSockets = [];
                    //     for (var clientId in clients ) {
                    //         //this is the socket of each client in the room.
                    //         var clientSocket = io.sockets.connected[clientId];
                    //         joinedSockets.append(clientSocket.nick)
                    //    }
                    //    console.log(joinedSockets)
                        for (member of members){
                            // if(users[member] && joinedSockets.includes(member) ){
                            //     console.log("here")
                            //     continue;
                            // }else if(users[member] && !joinedSockets.includes(member)){
                            //     users[member].join(data.room);
                            //     console.log("Joined a new person!");
                                // io.in(data.room).emit('big-announcement', 'the game will start soon');
                                // }
                                if(users[member]){
                                    users[member].join(data.room);
                                }
                            }
                            let obj= {
                                id: data.room,
                                msg: `${data.name} has joined the chat`,
                                type: "notif",
                            }
                            io.in(data.room).emit('joinedChat', obj);
                        break;
                    }
                }
            }
        }
    })

    // custom ting for adding a new user / updating his socket
    socket.on('newUser', async ({ id, name }, callback)=>{
        addUser({ id, name });
        console.log("No:", (Object.keys(users)).length);
        io.emit('updateStat', { id });
        callback(true);
        myGroups[id] = await Groups.find({ "members": {
            $in: [id]
        } });
        // console.log("Welp",myGroups[id])
        joinToExistingRooms(id, myGroups[id], name);
    });

    // think this is useless
    socket.on('sendMessage', (message, to, callback)=>{
        // console.log("Message:",message,"to:",to);
        callback();
    })

    // helper functions
    const addUser = ({ id, name }) => {
        id = id.trim();
        socket.nick = id;
        socket.user = name;
        users[socket.nick] = socket;
    };

    const joinToExistingRooms = (id, g, name) =>{
        if (g.length !== 0){
            for(i = 0; i < g.length; i++){
                if(g[i]._id in groups){
                    users[id].join(g[i]._id);
                    // emitting an event that says user is online
                    // console.log("User is online")
                    let obj= {
                        id: g[i]._id,
                        msg: `${name} is online`,
                        type: "notif",
                    }
                    socket.to(g[i]._id).emit('joinedChat', obj);
                }
            }
        }
    }

    const removeFromExistingRooms = (id, g) =>{
        if (g && g.length !== 0){
            for(i = 0; i < g.length; i++){
                if(g[i]._id in groups){
                    if(users[id]){
                        users[id].leave(g[i]._id);
                        // emitting an event that says user is online
                        console.log("User has left")
                        let obj= {
                            id: g[i]._id,
                            msg: `${users[id].user} has left the chat`,
                            type: "notif",
                        }
                        io.in(g[i]._id).emit('joinedChat', obj);
                    }
                    var clients = io.sockets.adapter.rooms[g[i]._id];
                    if(!clients || clients.length === 0){
                        console.log("Destroying group!");
                        delete groups[g[i]._id];
                    }
                }
            }
        }
    }

    const roomExist = (room, from=null, to=null) => {
        if(room in priv){
            return true;
        }else if(from && to){
            let tempto = [from, to].sort(compareFunc);
            let roomId = jwt.sign(tempto[0], tempto[1]);
            // console.log(users[tempto[0]])
            // console.log(users[tempto[1]])
            if(users[tempto[0]] && users[tempto[1]]){
                priv[roomId] = [tempto[0], tempto[1]];
                // console.log("Room made!",priv);
                users[tempto[0]].join(roomId);
                users[tempto[1]].join(roomId);
                // console.log("\nAll users are in!");
                // console.log(roomId);
                // console.log("PrivRoom",priv[roomId]);
                return true
            }else{
                console.log("One of the user isn't online!");
                return false;
            }
        }
        return false;
    }
    
    const removeUser = (id) => {
        if(id in users){
            for (var key of Object.keys(priv)){
                let temp = priv[key].includes(id)
                if(temp){
                    // console.log("Room",temp)
                    delete priv[key]
                }
            }
            delete users[id];
            return true;
        }else{
            return false;
        }
    }
    
})