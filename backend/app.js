'use strict';

let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dataBaseConfig = require('./data/db'),
    jwt = require('../backend/helper/jwt'),
    errorHandler = require('../backend/helper/errorHandler');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully ')
    },
    error => {
        console.log('Database not connected to database: ' + error);
    }
    );

const bookingRoute = require('./routes/booking.route');
const userRoute = require('./routes/user.route');
const placeRoute = require('./routes/place.route');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'dist/booking-project')));
app.use('/', express.static(path.join(__dirname, 'dist/booking-project')));
app.use('/api', placeRoute);
app.use('/api', bookingRoute);
app.use('/api', userRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
   console.log('Connected to port ' + port);
});

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
