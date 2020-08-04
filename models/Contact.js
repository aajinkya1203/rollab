const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const contactSchema = new mongoose.Schema({
    contacts: [{
        type: ObjectId,
        require: true
    }]
});

module.exports = new mongoose.model("Contact", contactSchema);