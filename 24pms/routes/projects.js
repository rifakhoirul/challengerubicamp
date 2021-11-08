var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('projects/list');
});

router.get('/add', function (req, res, next) {
    res.render('/projects/form');
});

router.post('/add', function (req, res, next) {
    res.redirect('/projects');
});

router.get('/edit/:id', function (req, res, next) {
    res.render('projects/form');
});

router.post('/edit/:id', function (req, res, next) {
    res.redirect('/projects');
});

router.get('/delete/:id', function (req, res, next) {
    res.redirect('/projects');
});

//overview
router.get('/overview/:projectid', function (req, res, next) {
    res.render('projects/overview/view');
});

//activity
router.get('/activity/:projectid', function (req, res, next) {
    res.render('projects/activity /view');
});

//members
router.get('/members/:projectid', function (req, res, next) {
    res.render('projects/list');
});

router.get('/members/:projectid/add', function (req, res, next) {
    res.render('/projects/form');
});

router.post('/members/:projectid/add', function (req, res, next) {
    res.redirect('/projects');
});

router.get('/members/:projectid/edit/:memberid', function (req, res, next) {
    res.render('projects/form');
});

router.post('/members/:projectid/edit/:memberid', function (req, res, next) {
    res.redirect('/projects');
});

router.get('/members/:projectid/delete/:memberid', function (req, res, next) {
    res.redirect('/projects');
});

//issues
router.get('/issues/:projectid', function (req, res, next) {
    res.render('projects/list');
});

router.get('/issues/:projectid/add', function (req, res, next) {
    res.render('/projects/form');
});

router.post('/issues/:projectid/add', function (req, res, next) {
    res.redirect(`/projects/issues/${req.params.projectid}`);
});

router.get('/issues/:projectid/edit/:issueid', function (req, res, next) {
    res.render('projects/form');
});

router.post('/issues/:projectid/edit/:issueid', function (req, res, next) {
    res.redirect('/projects');
});

router.get('/issues/:projectid/delete/:issueid', function (req, res, next) {
    res.redirect('/projects');
});

module.exports = router;