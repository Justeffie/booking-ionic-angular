'use strict';

const express = require('express');
const app = express();
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config')
const User = require('../model/User');

userRoutes.route('/users').get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    }).select('-hash');
});

userRoutes.route('/users/:id').get((req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    }).select('-/hash');
});

userRoutes.route('/users/update/:id').put((req, res, next) => {
    const user = User.findById(req.params.id);
    if (!user) {
        throw 'User not found';
    }

    if (user.email !== req.body.email && User.findOne({email: req.body.email})) {
        throw 'Email ' + req.body.email + ' is already taken';
    }

    if (req.body.password) {
        req.body.hash = bcrypt.hashSync(req.body.password, 10);
    }

    Object.assign(user, req.body);
    user.save()
        .then(data => res.json(data))
        .catch(err => next(err));
});

userRoutes.route('/users/register').post((req, res) => {
    const user = User.findOne({email: req.body.email});

    if (user) {
        throw 'Email ' + req.body.email + ' is already taken';
    }

    const newUser = new User(req.body);
    if (req.body.password) {
        newUser.hash = bcrypt.hashSync(req.body.password, 10);
    }

    User.create(newUser, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

userRoutes.route('/users/delete/:id').delete((req, res, next) =>{
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
});

userRoutes.route('/users/login').post((req, res, next) => {
    authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Email or password is incorrect'}))
        .catch(err => next(err));
});

userRoutes.route('/users/logout').post((req, resp, next) => {
    req.body.token = '';
    const user = User.findOne()
});

async function authenticate({email, password}) {
    const user = await User.findOne({email});
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub:user.id}, config.secret);
        return {
            ...userWithoutHash,
            token
        }
    }
}

module.exports = userRoutes;
