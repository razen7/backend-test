const mongoose = require('mongoose');

const orderScheme = mongoose.Schema(
    {
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant"
        },
        dish: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish"
        },
        quantity: {
            type: Integer,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
)

const OrderModel = mongoose.model("Order", orderScheme);
module.exports = OrderModel;