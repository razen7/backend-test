const router = require('express').Router();
const jwt = require('jsonwebtoken');
const CustomerModel = require('../models/customer');

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newEntry = new CustomerModel({
            name, email, password
        });
        await newEntry.save();
        res.status(201).send('User Created');
    } catch (e) {
        res.status(501).send(e.message);
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let customer = await CustomerModel.findOne({ email })
    if (customer === null) {
        return res.status(501).send('Email not registered');
    } else if (customer.password !== password) {
        return res.status(501).send('Invalid Password');
    }

    const payload = {
        id: customer.id,
        email: customer.email,
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).send({
        accessToken,
        refreshToken: process.env.REFRESH_TOKEN_SECRET,
        customerId: customer.id
    });
})

router.post('/token', async (req, res) => {
    const { id, email } = req.body;
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).send({
        accessToken,
    });

})


module.exports = router;