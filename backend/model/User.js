const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    }
    },{
        collection: 'users'
    });

User.set('toJSON', { virtuals: true});

module.exports = mongoose.model('User', User);
