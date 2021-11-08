var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('profile/form');
});

router.post('/', function (req, res, next) {
    res.redirect('/profile/form');
});

module.exports = router;