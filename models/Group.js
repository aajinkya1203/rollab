const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const groupsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    admin:{
        type: ObjectId,
        ref: 'User'
    },
    members:[{
        type: ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model("Group", groupsSchema);