var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const Data = require('../models/Data')
const key = require('../config/key.json')
const Response = require('../models/Response')
const helpers = require('../helpers/util')

//1 BROWSE
router.post('/search', helpers.isLogged, async function (req, res, next) {
    let { letter, frequency } = req.body
    if (letter == '') { letter = null }
    if (frequency == '') { frequency = null }
    try {
        let data
        if (!letter && !frequency) {
            data = await Data.find();
        } else if (letter && frequency) {
            data = await Data.find({ 'letter': letter, 'frequency': frequency })
        } else {
            data = await Data.find({
                $or: [
                    { 'letter': letter },
                    { 'frequency': frequency }
                ]
            });
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
        const data = await Data.find();
        res.json(new Response(data))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//3 EDIT
router.put('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Data.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.json(new Response({ message: 'Data have been updated', _id: data._id, letter: data.letter, frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//4 ADD
router.post('/', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Data.create({ ...req.body })
        res.json(new Response({ message: 'Data have been added', _id: data._id, letter: data.letter, frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//5 DELETE
router.delete('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Data.findByIdAndDelete(req.params.id)
        res.json(new Response({ message: 'Data have been deleted', _id: data._id, letter: data.letter, frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//6 FIND
router.get('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await Data.findById(req.params.id)
        res.json(new Response({ message: 'Data found', _id: data._id, letter: data.letter, frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

module.exports = router;