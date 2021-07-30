'use strict';

const express = require('express');
const app = express();
const bookingRoutes = express.Router();

const Booking = require('../model/Bookings');

bookingRoutes.route('/bookings').get((req, res) => {
    Booking.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

bookingRoutes.route('/bookings/:id').get((req, res) => {
    Booking.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

bookingRoutes.route('/bookings/update/:id').put((req, res, next) => {
    Booking.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

bookingRoutes.route('/bookings/add').post((req, res, next) => {
    Booking.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

bookingRoutes.route('/bookings/delete/:id').delete((req, res, next) => {
    Booking.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
});

module.exports = bookingRoutes;


