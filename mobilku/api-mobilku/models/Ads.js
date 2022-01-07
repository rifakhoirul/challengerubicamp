const { Schema, model } = require('mongoose');

const adsSchema = new Schema({
    name: String,
    city: String,
    imgSeller: String,
    imgCar: String,
    title: String,
    price: Number,
    year: Number,
    km: Number,
    transmission: String,
    bbm: String,
    views: { type: Number, default: 0 },
},
    {
        timestamps: true
    });

module.exports = model('Iklan', adsSchema);