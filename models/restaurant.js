const mongoose = require('mongoose');

const restaurantScheme = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        dishes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish"
        }]
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
)

const RestaurantModel = mongoose.model("Restaurant", restaurantScheme);
module.exports = RestaurantModel;