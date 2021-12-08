const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/cmsdb');
    const dataDateSchema = new mongoose.Schema({
        letter: Date,
        frequency: Number,
    },
        {
            timestamps: true
        });
    const DataDate = await mongoose.model('DataDate', dataDateSchema)
    const seed = require('./data.json')
    await DataDate.insertMany(seed)
    console.log('Success')
}

main().catch(err=>{
    console.log(err)
})
