var express = require('express');
var router = express.Router();
const Ads = require('../models/Ads');
const Response = require('../utils/Response');
const moment = require('moment');

//GET POPULAR ADS
router.get('/popular', async function (req, res, next) {
  try {
    const data = await Ads.find().sort({ views: -1 }).limit(4);
    dataAds = []
    data.forEach(item => {
      const news = {
        id: item._id,
        title: item.title,
        content: item.content,
        image: item.image,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      }
      dataAds.push(news)
    })
    res.json(new Response(dataAds));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

//GET ALL NEWS
router.get('/', async function (req, res, next) {
  try {
    const data = await Ads.find().sort({ createdAt: -1 }).limit(10);
    dataAds = []
    data.forEach(item => {
      const news = {
        id: item._id,
        title: item.title,
        content: item.content,
        image: item.image,
        tags: item.tags,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      }
      dataAds.push(news)
    })
    res.json(new Response(dataAds));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

//GET NEWS BY ID
router.get('/:id', async function (req, res, next) {
  try {
    const data = await Ads.find({_id:req.params.id});
    dataAds = []
    data.forEach(item => {
      const news = {
        id: item._id,
        title: item.title,
        content: item.content,
        image: item.image,
        tags: item.tags,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      }
      dataAds.push(news)
    })
    res.json(new Response(dataAds));
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





