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
    res.render('profile/form', {
        email: req.session.user.email,
        position: req.session.user.position,
        fulltime: req.session.user.isfulltime,
        infoFailed: req.flash('infoFailed'),
        infoSuccess: req.flash('infoSuccess')
    });
});

router.post('/', checkLogIn, function (req, res, next) {
    let fulltime = req.body.fulltime
    fulltime == 'on' ? fulltime = true : fulltime = false;
    console.log(req.session.user.email)
    if (req.body.password == '') {
        db.query(`UPDATE users SET position = '${req.body.position}', isfulltime = ${fulltime} WHERE email = '${req.session.user.email}'; `, (err, res) => {
            if (err) {
                req.flash('infoFailed', 'Error.');
                return console.log(err);
            }
        })
        req.session.user.position = req.body.position;
        req.session.user.isfulltime = fulltime;
        req.flash('infoSuccess', 'Profil updated successfully.')
        res.render('profile/form', {
            email: req.session.user.email,
            position: req.session.user.position,
            fulltime: req.session.user.isfulltime,
            infoFailed: req.flash('infoFailed'),
            infoSuccess: req.flash('infoSuccess')
        });
    } else {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            if (err) return console.log(err);
            db.query(`UPDATE users SET password = '${hash}', position = '${req.body.position}', isfulltime = ${fulltime} WHERE email = '${req.session.user.email}'`, (err, res) => {
                if (err) {
                    req.flash('infoFailed', 'Error.');
                    return console.log(err);
                };
                req.session.user.position = req.body.position;
                req.session.user.isfulltime = fulltime;
            })
            req.session.user.position = req.body.position;
            req.session.user.isfulltime = fulltime;
            req.flash('infoSuccess', 'Profil updated successfully.')
            res.redirect('/profile');
        });
    }
});

module.exports = router;