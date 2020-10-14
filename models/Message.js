const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
    convos:[{
        person: ObjectId,
        messages: [{
            text: String,
            sender: ObjectId,
            time:{
                type: Date
            }
        }]
    }],
    
});

module.exports = new mongoose.model("Message", messageSchema);