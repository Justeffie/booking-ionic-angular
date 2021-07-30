const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Place = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    available_from: {
        type: Date,
        required: true
    },
    available_to: {
        type: Date,
        required: true
    }
    }, {
    collection: 'places'
});

Place.set('toJSON', { virtuals: true});

module.exports = mongoose.model('Place', Place);
