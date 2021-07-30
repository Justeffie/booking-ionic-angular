'use strict';

const express = require('express');
const app = express();
const placeRoute = express.Router();

let Place = require('../model/Place');

placeRoute.route('/places').get((req, res) => {
    Place.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

placeRoute.route('/places/add').post((req, res, next) =>{
    Place.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
});

placeRoute.route('/places/:id').get((req, res) => {
    Place.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

placeRoute.route('/places/update/:id').put((req, res, next) => {
    Place.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

placeRoute.route('/places/delete/:id').delete((req, res, next) => {
    Place.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = placeRoute;
