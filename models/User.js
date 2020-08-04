const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true,
    },
    name:{
        type: String,
        require: true
    },
    contactsId:{
        type: ObjectId,
        ref: "Contact"
    },
    groups:[{
        type: ObjectId,
        ref: "Group"
    }],
    messageId:{
        type: ObjectId,
        ref: "Message"
    },
});

module.exports = mongoose.model("User", userSchema);