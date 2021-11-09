const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()
let data = [];

function checkLogIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

router.get('/', checkLogIn, async function (req, res, next) {
    let data = await db.query('SELECT * FROM projects')
    res.render('projects/list',{
        data:data.rows,
    });
});

router.get('/add', checkLogIn, function (req, res, next) {
    res.render('/projects/form');
});

router.post('/add', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/edit/:id', checkLogIn, function (req, res, next) {
    res.render('projects/form');
});

router.post('/edit/:id', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/delete/:id', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

//overview
router.get('/overview/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/overview/view');
});

//activity
router.get('/activity/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/activity /view');
});

//members
router.get('/members/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/list');
});

router.get('/members/:projectid/add', checkLogIn, function (req, res, next) {
    res.render('/projects/form');
});

router.post('/members/:projectid/add', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/members/:projectid/edit/:memberid', checkLogIn, function (req, res, next) {
    res.render('projects/form');
});

router.post('/members/:projectid/edit/:memberid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/members/:projectid/delete/:memberid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

//issues
router.get('/issues/:projectid', checkLogIn, function (req, res, next) {
    res.render('projects/list');
});

router.get('/issues/:projectid/add', checkLogIn, function (req, res, next) {
    res.render('/projects/form');
});

router.post('/issues/:projectid/add', checkLogIn, function (req, res, next) {
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

router.get('/issues/:projectid/edit/:issueid', checkLogIn, function (req, res, next) {
    res.render('projects/form');
});

router.post('/issues/:projectid/edit/:issueid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

router.get('/issues/:projectid/delete/:issueid', checkLogIn, function (req, res, next) {
    res.redirect('/projects');
});

module.exports = router;