const { Schema, model } = require('mongoose')

const mapsSchema = new Schema({
    title: String,
    lat: Number,
    lng: Number
},
    {
        timestamps: true
    });

module.exports = model('Maps', mapsSchema)