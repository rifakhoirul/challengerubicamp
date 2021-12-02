const { Schema, model } = require('mongoose')

const dataSchema = new Schema({
    letter: String,
    frequency: Number,
},
    {
        timestamps: true
    });

module.exports = model('Data', dataSchema)