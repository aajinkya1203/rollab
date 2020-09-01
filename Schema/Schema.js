const express = require('express');
// const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const Group = require('../models/Group');
const Message = require('../models/Message');
const { JWT_SEC } = require('../keys/keys');
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const graphql = require('graphql');
const _ = require('lodash');
var mongoose = require('mongoose');



const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql

// dummy data
test = [
    {id:"1", name: "aajinkya", password:"1234", email:"abc@.com", groups:[ "11", "12", "13", "14", "15" ], contactsId: "21", messageId:"31"},
    {id:"2", name: "not aajinkya", password:"1234", email:"nota@.com", groups:[ "12", "13", "15" ], contactsId: "22", messageId:"32"},
    {id:"3", name: "aaju", password:"1234", email:"aaju@.com", groups:[ "11", "14" ], contactsId: "23", messageId:"33"},
    {id:"4", name: "testaaju", password:"1234", email:"testaju@.com", groups:[ "11", "13" ], contactsId: "24", messageId:"34"},
    {id:"5", name: "AAAJUU", password:"1234", email:"aaaju@.com", groups:[ "14", "15" ], contactsId: "25", messageId:"35"},
    {id:"6", name: "jinkya", password:"1234", email:"jinkya@.com", groups:[ "12", "13", "14", "15" ], contactsId: "26", messageId:"36"},
]

contacts = [
    { id: "21", contacts:[ "4", "2" ] },
    { id: "22", contacts:[ "1", "4", "5" ] },
    { id: "23", contacts:[ "1", "4", "2", "5" ] },
    { id: "24", contacts:[ "3", "4", "2" ] },
    { id: "25", contacts:[ "6", "3", "2" ] },
    { id: "26", contacts:[ "5", "4", "1" ] },
]

groupTest = [
    { id: "11", name:"VAMS", members: [ "1", "3", "4" ] },
    { id: "12", name:"MAVS", members: [ "2", "6", "1" ] },
    { id: "13", name:"GUJU", members: [ "1", "2", "4", "6" ] },
    { id: "14", name:"NERDS", members: [ "3", "5", "6", "1" ] },
    { id: "15", name:"LOKI", members: [ "2", "5", "1", "6" ] },
]

messages = [
    { 
        id:"31", convos: [
            { 
                person: "6",
                messages: [
                    { text: "Hey", time: "Today", sender: "1" },
                    { text: "Yo", time: "Today", sender: "6" },
                    { text: "wassup", time: "Today", sender: "1" },
                    { text: "all good, wbu", time: "Today", sender: "6" },
                    { text: "bruh", time: "Today", sender: "1" },
                    { text: "same", time: "Today", sender: "1" },
                ]
            },
            {
                person: "3",
                messages: [
                    { text: "Hey", time: "Today", sender: "1" },
                    { text: "Yo", time: "Today", sender: "3" },
                    { text: "you heard the new song?", time: "Today", sender: "1" },
                    { text: "whosee.?!", time: "Today", sender: "3" },
                    { text: "ye", time: "Today", sender: "1" },
                    { text: "ahha, yep", time: "Today", sender: "3" },
                ]
            }
        ]
    },
    {
        id: "33", convos: [
            {
                person: "1",
                messages: [
                    { text: "Hey", time: "Today", sender: "1" },
                    { text: "Yo", time: "Today", sender: "6" },
                    { text: "wassup", time: "Today", sender: "1" },
                    { text: "all good, wbu", time: "Today", sender: "6" },
                    { text: "bruh", time: "Today", sender: "1" },
                    { text: "same", time: "Today", sender: "1" },
                ]
            }
        ]
    },
    {
        id: "36", convos: [
            {
                person: "1",
                messages: [
                    { text: "Hey", time: "Today", sender: "1" },
                    { text: "Yo", time: "Today", sender: "3" },
                    { text: "you heard the new song?", time: "Today", sender: "1" },
                    { text: "whosee.?!", time: "Today", sender: "3" },
                    { text: "ye", time: "Today", sender: "1" },
                    { text: "ahha, yep", time: "Today", sender: "3" },
                ]
            }
        ]
    }

]

// ---------------- GQL Types --------------- //

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        contacts: {
            type: ContactsType,
            async resolve(parent, args){
                // async action to db
                return Contact.findById(parent.contactsId);
            }
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve(parent,args){
                return Group.find().where('_id').in(parent.groups);
            }
        },
        message:{
            type: messageType,
            resolve(parent, args){
                return Message.findById(parent.messageId);
            }
        },
        messages: {
            type: allMessageType,
            resolve(parent, args){
                return Message.findById(parent.messageId);
            }
        },
        token: { type: GraphQLString },
    })
});

const ContactsType = new GraphQLObjectType({
    name: "Contact",
    fields: ()=>({
        id: { type: GraphQLID },
        people : {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find().where('_id').in(parent.contacts);
            }
        }
    })
});


const GroupType = new GraphQLObjectType({
    name: "Group",
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        admin: { 
            type: UserType,
            resolve(parent,args){
                return User.findById(parent.admin)
            }
        },
        members: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find().where('_id').in(parent.members);
            }
        }
    })
});

const messageType = new GraphQLObjectType({
    name: "Message",
    fields: ()=>({
        id: {type: GraphQLID},
        convos: {
            type: SepMessages,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // console.log(args)
                // console.log(parent.convos)
                return _.find(parent.convos, { person: mongoose.Types.ObjectId(args.id) });
            }
        }
    })
})
const allMessageType = new GraphQLObjectType({
    name: "Messages",
    fields: ()=>({
        id: {type: GraphQLID},
        convos: {
            type: new GraphQLList(SepMessages),
            resolve(parent, args){
                // console.log(parent)
                return parent.convos;
            }
        }
    })
})

const SepMessages = new GraphQLObjectType({
    name: "SepMessages",
    fields: ()=>({
        person: {
            type: UserType,
            async resolve(parent, args){
                return await User.findById(parent.person);
            }
        },
        messages: {
            type: new GraphQLList(text),
            resolve(parent, args){
                return parent.messages
            }
        }
    })
});

const text = new GraphQLObjectType({
    name: "Texts",
    fields: ()=>({
        text: { type: GraphQLString},
        time: { type: GraphQLString},
        sender: {
            type: UserType,
            async resolve(parent, args){
                // return _.find(test, { id:parent.sender })
                return await User.findById(parent.sender);
            }
        }
    })
});


// -------------- Root Query ------------- //

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        },
        allUsers:{
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return User.find();
            }
        },
        allContacts:{
            type: ContactsType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args){
                return await Contact.findById(args.id);
            }
        },
        contacts: {
            type: ContactsType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // return _.find(contacts, {id: args.id})
                return Contact.findById(args.id)
            }
        },
        group: {
            type: GroupType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // return _.find(groupTest, { id: args.id })
                return Group.findById(args.id);
            }
        },
        message: {
            type: messageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // return _.find(messages, { id: args.id })
                return Message.findById(args.id);
            }
        },
        allMyGroups: {
            type: new GraphQLList(GroupType),
            args: { id: { type: GraphQLID } },
            async resolve(parent, args){
                let list = await Group.find({ "members": {
                    $in: [args.id]
                } })
                return list
            }
        }

    }
});


// ------------- Mutations -------------- //

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // too add a new User -- sign up
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args){
                if(!args.email || !args.name || !args.password){
                    // console.log("error?")
                    throw new Error("Kindly provide all details");
                }
                let final = await User.findOne({ email: args.email }).then(async(res)=>{
                    // console.log("here:",res)
                    if(res){
                        throw new Error("An account with the same email already exist! Try Logging in!");
                    }

                    // setting up user's message, contacts record
                    let contactRec, messageRec;
                    const contacting = new Contact({
                        contacts: []
                    });
                    contactRec = await contacting.save()

                    if(!contactRec){
                        throw new Error('Oops! This is embarassing. Try again maybe?')
                    }
                    const messaging = new Message({
                        convos: []
                    });
                    messageRec = await messaging.save();

                    if(!messageRec){
                        throw new Error('Oops! This is embarassing. Try again maybe?')
                    }
                    let hashedPwd = await bcrypt.hash(args.password, 15)
                    if(!hashedPwd){
                        throw new Error('Our servers seems to be a lil busy today. Try again later?')
                    }
                    const newUser = new User({
                        name: args.name,
                        password: hashedPwd,
                        email: args.email,
                        contactsId: contactRec._id,
                        messageId: messageRec._id,
                        groups: []
                    });
                    let results = await newUser.save()
                    if(!results){
                        throw new Error('Uh-oh! This wasn\'t meant to happen.Make sure your internet connection is strong.')
                    }
                    return results;
                })
                if(!final){
                    throw new Error('Our servers seems to be a lil busy today. Try again later?')
                }
                return final

            }
        }, //add user mutation

        // this is for login
        login: {
            type: UserType,
            args:{
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args){
                if(!args.email || !args.password){
                    // console.log("error?")
                    throw new Error("Kindly provide all details");
                }
                let final = await User.findOne({ email: args.email }).then(async(res)=>{
                    if(!res){
                        throw new Error("Yayzow! We can't find an account with that email. You gotta register first, you know ¯\_(ツ)_/¯");
                    }

                    // checking the password comparison
                    let didMatch = await bcrypt.compare(args.password, res.password)
                    if(!didMatch){
                        throw new Error("Invalid Email and Password combination :(")
                    }
                    const token = jwt.sign({_id:res._id},JWT_SEC);
                    res['token'] = token;
                    return res;
                })
                if(!final){
                    throw new Error('Our servers seems to be a lil busy today. Try again later?')
                }
                return final

            }
        }, //login mutation done
        addContact:{
            type: ContactsType,
            args: {
                from: { type: new GraphQLNonNull(GraphQLString) },
                fromCont: { type: new GraphQLNonNull(GraphQLString) }, //from contact id
                toCont: { type: new GraphQLNonNull(GraphQLString) }, //to contact id
                to: { type: new GraphQLNonNull(GraphQLString) } 
            },
            async resolve(parent, args){
                let doesExist = await Contact.find({_id: mongoose.Types.ObjectId(args.fromCont), "contacts": { $in: [args.to] } });
                console.log(doesExist)
                if(doesExist.length != 0){
                    console.log("exitting")
                    return;
                }

                let fin = await Contact.findByIdAndUpdate(args.fromCont,{
                    $push: { "contacts": args.to }
                },{
                    new: true
                }).then(async (res)=>{
                    if(!res){
                        throw new Error("Something went wrong. Try again after few minutes!")
                    }
                    let test = await Contact.findByIdAndUpdate(args.toCont,{
                        $push: { "contacts": args.from }
                    },{
                        new: true
                    }).exec((err,ele)=>{
                        if(err){
                            throw new Error("Something went wrong. Try again after few minutes!")
                        }
                    });
                    return res;
                });
                if(!fin){
                    throw new Error('Our servers seems to be a lil busy today. Try again later?')
                }
                return fin;
            }
        }, //add contact mutation done

        // mutation for sending a message
        sendMessage: {
            type: messageType,
            args: {
                text:{ type: new GraphQLNonNull(GraphQLString) },
                sender: { type: new GraphQLNonNull(GraphQLString) },
                person: { type: new GraphQLNonNull(GraphQLString) }, // person id
                // time: { type: new GraphQLNonNull(GraphQLString) },
                id: { type: new GraphQLNonNull(GraphQLString) }, // message id of user
                personId: { type: new GraphQLNonNull(GraphQLString) }, // message id of the other person
                userId: { type: new GraphQLNonNull(GraphQLString) }, // user id
            },
            async resolve(parent, args){
                let test = await Message.findById(args.id).then(async (ele)=>{
                    if(!ele){
                        throw new Error("Something went wrong!");
                    }
                    var obj = {
                        text: args.text,
                        sender: mongoose.Types.ObjectId(args.sender),
                        time: new Date()
                    };
                    let temp = _.find(ele.convos, { person: mongoose.Types.ObjectId(args.person) } );
                    if(!temp){
                        let tempo = await Message.findByIdAndUpdate(args.id, {
                            $push: { 
                                convos: {
                                    person: mongoose.Types.ObjectId(args.person),
                                    messages: obj
                                }
                            }
                        },{
                            new: true
                        });
                        if(!tempo){
                            throw new Error("Our servers are too busy at the moment! Try again later...");
                        }
                        let tempotart = await Message.findByIdAndUpdate(args.personId, {
                            $push: { 
                                convos: {
                                    person: mongoose.Types.ObjectId(args.userId),
                                    messages: [obj]
                                }
                            }
                        },{
                            new: true
                        });
                        if(!tempotart){
                            throw new Error("Our servers are too busy at the moment! Try again later...");
                        }
                        return;
                    }
                    let resu = await Message.findOneAndUpdate({ convos: { $elemMatch: { person: args.person } }, _id: args.id},{
                        $push: {
                            'convos.$.messages': obj
                        }
                    });
                    if(!resu){
                        throw new Error("Our servers are too busy at the moment! Try again later...");
                    }
                    let resutart = await Message.findOneAndUpdate({ convos: { $elemMatch: { person: args.userId } }, _id: args.personId},{
                        $push: {
                            'convos.$.messages': obj
                        }
                    });
                    if(!resutart){
                        throw new Error("Our servers are too busy at the moment! Try again later...");
                    }
                    return ele;
                });
                return test;
            }
        }, // sendMessage mutation ends here
        createGroup: {
            type: GroupType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                admin: { type: new GraphQLNonNull(GraphQLString) },
                members: { type: new GraphQLList(GraphQLString) }
            },
            async resolve(parent, args) {
                if( !args.name || !args.members){
                    throw new Error("Kindly provide all details");
                }
                const newGroup = new Group({
                    name: args.name,
                    admin: args.admin,
                    members: args.members
                });
                const results = await newGroup.save();
                // checking if its done
                if(!results){
                    throw new Error("Oopsie Doopsie! That wasn't supposed to happen. Try our techy solution: REFRESH!")
                }
                args.members.forEach(async (person) => {
                    let tempo = await User.findByIdAndUpdate(person,{
                        $push: {
                            groups: results._id
                        }
                    });
                    if(!tempo){
                        throw new Error("Uh-oh! Everyone hates network issues :/")
                    }
                });
                return results
            }
        }, // create Group ends here
    }  // fields

})


// -------- Schema --------- //
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})