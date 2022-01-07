var express = require('express');
var router = express.Router();
const Ads = require('../models/Ads');
const Response = require('../utils/Response');
const moment = require('moment');

//GET ADS
router.get('/', async function (req, res, next) {
  const { limit } = req.query;
  try {
    let data
    if (limit) {
      data = await Ads.find().sort({ createdAt: -1 }).limit(limit);
    } else {
      data = await Ads.find().sort({ createdAt: -1 });
    }
    dataAds = [];
    data.forEach(item => {
      const ads = {
        id: item._id,
        name: item.name,
        city: item.city,
        imgSeller: item.imgSeller,
        imgCar: item.imgCar,
        title: item.title,
        price: item.price,
        year: item.year,
        km: item.km,
        transmission: item.transmission,
        bbm: item.bbm,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      };
      dataAds.push(ads);
    })
    res.json(new Response(dataAds));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

//GET POPULAR ADS
router.get('/popular', async function (req, res, next) {
  const { limit } = req.query;
  try {
    let data;
    if (limit) {
      data = await Ads.find().sort({ views: -1 }).limit(limit);
    } else {
      data = await Ads.find().sort({ views: -1 });
    }
    dataAds = [];
    data.forEach(item => {
      const ads = {
        id: item._id,
        name: item.name,
        city: item.city,
        imgSeller: item.imgSeller,
        imgCar: item.imgCar,
        title: item.title,
        price: item.price,
        year: item.year,
        km: item.km,
        transmission: item.transmission,
        bbm: item.bbm,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      };
      dataAds.push(ads);
    })
    res.json(new Response(dataAds));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

//GET ADS BY ID
router.get('/:id', async function (req, res, next) {
  try {
    const data = await Ads.find({ _id: req.params.id });
    dataAds = [];
    data.forEach(item => {
      const ads = {
        id: item._id,
        name: item.name,
        city: item.city,
        imgSeller: item.imgSeller,
        imgCar: item.imgCar,
        title: item.title,
        price: item.price,
        year: item.year,
        km: item.km,
        transmission: item.transmission,
        bbm: item.bbm,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      };
      dataAds.push(ads);
    })
    res.json(new Response(dataAds[0]));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});


//CREATE ADS
router.post('/', async function (req, res, next) {
  try {
    const data = await Ads.create({ ...req.body });
    res.json(new Response(data));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

module.exports = router;





