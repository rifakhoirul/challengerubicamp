const { Schema, model } = require('mongoose');

const newsSchema = new Schema({
    title: String,
    content: String,
    image: [String],
    views: { type: Number, default: 0 },
    tags: [String],
},
    {
        timestamps: true
    });

module.exports = model('News', newsSchema);