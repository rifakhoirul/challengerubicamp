const mongoose = require('mongoose');
const News = require("../models/News");
const Ads = require('../models/Ads');
const adsSeeds = require('./adsSeeds.json');
const newsSeeds = require('./newsSeeds.json');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mobilkudb');
  await News.insertMany(newsSeeds);
  await Ads.insertMany(adsSeeds);
  console.log('Seeder success');
};