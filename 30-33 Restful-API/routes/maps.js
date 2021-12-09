var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const Maps = require('../models/Maps')
const key = require('../config/key.json')
const Response = require('../models/Response')
const helpers = require('../helpers/util')

//1 BROWSE
router.post('/search', helpers.isLogged, async function (req, res, next) {
    let { title } = req.body
    if (title == '') { title = null }
    try {
        let data
        if (!title) {
            data = await Maps.find().sort({ updatedAt: -1 })
        } else {
            data = await Maps.find({ 'title': { $regex: title } })
        }
        res.json(new Response(data))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//2 READ
router.get('/', helpers.isLogged, async function (req, res, next) {
    try {
        let data = await Maps.find().sort({ updatedAt: -1 });
        res.json(new Response(data))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//3 EDIT
router.put('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Maps.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.json(new Response({ message: 'Data have been updated', _id: data._id, title: data.title, lat: data.lat, lng: data.lng }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//4 ADD
router.post('/', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Maps.create({ ...req.body })
        res.json(new Response({ message: 'Data have been added', _id: data._id, title: data.title, lat: data.lat, lng: data.lng }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//5 DELETE
router.delete('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Maps.findByIdAndDelete(req.params.id)
        res.json(new Response({ message: 'Data have been deleted', _id: data._id, title: data.title, lat: data.lat, lng: data.lng }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//6 FIND
router.get('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Maps.findById(req.params.id)
        res.json(new Response({ message: 'Data found', _id: data._id, title: data.title, lat: data.lat, lng: data.lng }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

module.exports = router;