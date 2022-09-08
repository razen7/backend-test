const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    buyer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    closedAt:{
        type: Date,
    },
    interestedBuyers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    active: {
        type: Boolean,
        default: true,
    },
});

const AdModel = mongoose.model("Ad", adSchema);
module.exports = AdModel;