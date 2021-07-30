const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Booking = new Schema({
    place_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    place_title: {
        type: String,
        required: true,
    },
    place_image: {
        type: String,
        required: true,
    },
    fist_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    guest_number: {
        type: Number,
        required: true,
    },
    booked_from: {
        type: Date,
        required: true
    },
    booked_to: {
        type: Date,
        required: true
    }
}, {
    collection: 'bookings'
});

Booking.set('toJSON', { virtuals: true});

module.exports = mongoose.model('Booking', Booking);
