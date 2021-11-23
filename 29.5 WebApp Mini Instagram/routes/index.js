var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
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
