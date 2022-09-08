const router = require('express').Router();
const jwt = require('jsonwebtoken');
const DishModel = require('../models/dish');
const RestaurantModel = require('../models/restaurant');

// POST /restaurants: Creates new restaurant
router.post('', async (req, res) => {
    const { name } = req.body;
    try {
        const newEntry = new RestaurantModel({
            name
        });
        await newEntry.save();
        res.status(201).send('Restaurant Created with ID: ' + newEntry.id);
    } catch (e) {
        res.status(501).send(e.message);
    }
})

// GET /restaurants: List all restaurants
router.get('', async (req, res) => {
    let findAll = await RestaurantModel.find();
    res.status(201).send(findAll);
})

//POST /restaurants/:id/add-dish: Add new dish for a restaurant
router.post('/:id/add-dish', async (req, res) => {
    try {
        let restaurant = await RestaurantModel.findById(req.params.id).exec();

        let dish = new DishModel({

        })
    } catch (error) {
        res.status(501).send(error.message)
    }
    // console.log(restaurant);

})



module.exports = router;