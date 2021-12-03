const { Schema, model } = require('mongoose')

const dataDateSchema = new Schema({
    letter: Date,
    frequency: Number,
},
    {
        timestamps: true
    });

module.exports = model('DataDate', dataDateSchema)