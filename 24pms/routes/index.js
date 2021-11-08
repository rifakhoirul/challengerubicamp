var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/auth', function (req, res, next) {
  // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
  //   if(err) return res.send(err)
    
  //   // Store hash in your password DB.
  // });


  res.redirect('/projects');
});

router.get('/logout', function (req, res, next) {
  res.redirect('/');
});

module.exports = router;
