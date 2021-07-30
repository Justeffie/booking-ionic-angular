const expressJwt = require('express-jwt');
const config = require('../config');
const User = require('../model/User');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({secret, isRevoked})
        .unless({
            path: [
                '/users/login',
                '/users/register'
            ]
        });
}

async function isRevoked(req, payload, done) {
    const user = await  User.findById(payload.sub).select('-hash');

    if (!user) {
        return done(null, true);
    }

    done();
}
