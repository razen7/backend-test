const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const DB_URI = 'mongodb+srv://admin:wB3iDDpS8mfrW6ko@cluster0.gcqabka.mongodb.net/?retryWrites=true&w=majority';
require('dotenv').config();
const app = express();
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

mongoose
    .connect(
        DB_URI,
        {
            useUnifiedTopology: true,
            useNewURLParser: true,
        },
    )
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

// All router imports
const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/category')
const adRouter = require('./routes/ad')



function authenticateRequest(req, res, next) {
    const authHeaderInfo = req.headers['authorization'];

    if (authHeaderInfo === undefined) {
        return res.status(401).send("No token was provided");
    }

    const token = authHeaderInfo.split(" ")[1];
    if (token === undefined) {
        return res.status(401).send("Proper token was not provided");
    }
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userInfo = payload;
        next();
    } catch (error) {
        res.status(401).send("Invalid token provided" + error.message);
    }
}

// Middleware usage
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Router related usage
app.use('/auth', authRouter);
app.use(authenticateRequest);
app.use('/category', categoryRouter);
app.use('/ads', adRouter);
app.listen(8000);