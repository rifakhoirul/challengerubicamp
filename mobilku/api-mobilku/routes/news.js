var express = require('express');
var router = express.Router();
const News = require('../models/News');
const Response = require('../utils/Response');
const moment = require('moment');

//GET NEWS
router.get('/', async function (req, res, next) {
  const { limit } = req.query;
  try {
    let data;
    if (limit) {
      data = await News.find().sort({ createdAt: -1 }).limit(limit);
    } else {
      data = await News.find().sort({ createdAt: -1 });
    }
    dataNews = [];
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
      dataNews.push(news);
    })
    res.json(new Response(dataNews));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

//GET POPULAR NEWS
router.get('/popular', async function (req, res, next) {
  const { limit } = req.query;
  try {
    let data;
    if(limit){
      data = await News.find().sort({ views: -1 }).limit(limit);
    }else{
      data = await News.find().sort({ views: -1 });
    }
    dataNews = [];
    data.forEach(item => {
      const news = {
        id: item._id,
        title: item.title,
        content: item.content,
        image: item.image,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      };
      dataNews.push(news);
    })
    res.json(new Response(dataNews));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

//GET ALL NEWS ID
router.get('/all-id', async function (req, res, next) {
  try {
    const data = await News.find();
    dataNews = [];
    data.forEach(item => {
      const news = {
        id: item._id,
      };
      dataNews.push(news);
    })
    res.json(new Response(dataNews));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

//GET NEWS BY ID
router.get('/:id', async function (req, res, next) {
  try {
    const data = await News.find({ _id: req.params.id });
    dataNews = [];
    data.forEach(item => {
      const news = {
        id: item._id,
        title: item.title,
        content: item.content,
        image: item.image,
        tags: item.tags,
        createdAt: moment(item.createdAt).format('LLLL'),
        updatedAt: moment(item.updatedAt).format('LLLL')
      };
      dataNews.push(news);
    })
    res.json(new Response(dataNews[0]));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});


//CREATE NEWS
router.post('/', async function (req, res, next) {
  try {
    const data = await News.create({ ...req.body });
    res.json(new Response(data));
  } catch (err) {
    console.log(err);
    res.status(500).json(new Response({ message: err }, false));
  }
});

module.exports = router;
