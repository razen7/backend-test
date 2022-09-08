const express = require('express')
const app = express()

const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://admin:wB3iDDpS8mfrW6ko@cluster0.gcqabka.mongodb.net/exam?retryWrites=true&w=majority';
require('dotenv').config();
// const jwt = require('jsonwebtoken');
mongoose.connect(
    DB_URI,
    {
        useUnifiedTopology: true,
        useNewURLParser: true,
    }
)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

// All router imports
const authRouter = require('./routes/auth.route');
const restaurantRouter = require('./routes/restaurant.route');

// Middleware usage
app.use(express.json());
// Router related usage
app.use('/auth',authRouter);
app.use('/restaurants',restaurantRouter);

app.listen(8000)