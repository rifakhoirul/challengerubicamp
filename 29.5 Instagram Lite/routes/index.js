var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', async function (req, res, next) {
  try{
    // await models.Users.create({
    //   email:'riko@mail.com',
    //   password:'123',
    //   username:'riko'
    // });

    //const todo = await models.Todo.create({...req.body})
    //res.json(todo)

    const users = await models.Users.findAll();
    console.log(users[1].dataValues)
  } catch (error){
    console.log(error)
    res.status(500).json(error)
  }
  
  res.render('index');
});

router.post('/auth', function (req, res, next) {
  res.render('redirect');
})

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/profile', function (req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/add', function (req, res, next) {
  res.render('add');
});

module.exports = router;
