const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mailsSent: {type: Number, default: 0},
})

const User = mongoose.model('User', userSchema);

module.exports = User;