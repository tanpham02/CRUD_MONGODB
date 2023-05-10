const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    restaurant_id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    borough: {type: String, required: true},
    cuisine: {type: String, required: true},
    address: {
        street: {type: String, required: true},
        building: {type: String, required: true},
        zipcode: {type: String, required: true},
        coord: [String]
    },
    grades: [
        {
            date: {type: Date, required: true},
            grade: {type: String, required: true},
            score: {type: String, required: true},
        } 
    ]

}, {versionKey: false})

const RestaurantDB = mongoose.model('restaurants', schema);

module.exports = RestaurantDB;    

