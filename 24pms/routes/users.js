const Router = require('express-promise-router')
const router = new Router()
const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

function checkLogIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

router.get('/', checkLogIn, function (req, res, next) {
    res.render('users/list');
});

router.get('/add', checkLogIn, function (req, res, next) {
    res.render('users/form');
});

router.post('/add', checkLogIn, function (req, res, next) {
    let fulltime = req.body.fulltime
    fulltime == 'on' ? fulltime = true : fulltime = false;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) return res.send(err)
        db.query(`INSERT INTO users (email, password, firstname, lastname, position, role, isfulltime) values('${req.body.email}', '${hash}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.position}', '${req.body.role}',${fulltime}); `, (err) => {
            if (err) console.log(err);
        })
    });
    res.redirect('/users');
});

router.get('/edit/:id', checkLogIn, function (req, res, next) {
    res.render('users/form');
});

router.post('/edit/:id', checkLogIn, function (req, res, next) {
    res.redirect('/users');
});

router.get('/delete/:id', checkLogIn, function (req, res, next) {
    res.redirect('/users');
});

module.exports = router;