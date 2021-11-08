const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', function (req, res, next) {
    res.render('users/list');
});

router.get('/add', function (req, res, next) {
    res.render('users/form');
});

router.post('/add', function (req, res, next) {
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) return res.send(err)
        db.query(`INSERT INTO users (email, password, firstname, lastname, position, role) values('${req.body.email}', '${hash}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.position}', '${req.body.role}'); `, (err) => {
            if (err) console.log(err);
        })
    });

    
    res.redirect('/users');
});

router.get('/edit/:id', function (req, res, next) {
    res.render('users/form');
});

router.post('/edit/:id', function (req, res, next) {
    res.redirect('/users');
});

router.get('/delete/:id', function (req, res, next) {
    res.redirect('/users');
});

module.exports = router;