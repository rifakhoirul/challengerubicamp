var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const DataDate = require('../models/DataDate')
const key = require('../config/key.json')
const Response = require('../models/Response')
const helpers = require('../helpers/util')
const moment = require('moment');

//1 BROWSE
router.post('/search', helpers.isLogged, async function (req, res, next) {
    let { letter, frequency } = req.body
    if (letter == '') { letter = null }
    if (frequency == '') { frequency = null }
    try {
        let data
        if (!letter && !frequency) {
            data = await DataDate.find();
        } else if (letter && frequency) {
            data = await DataDate.find({ 'letter': letter, 'frequency': frequency })
        } else {
            data = await DataDate.find({
                $or: [
                    { 'letter': letter },
                    { 'frequency': frequency }
                ]
            });
        }
        let temp = []
        data.forEach(item => {
            let element = { _id: item._id, letter: moment(item.letter).format('YYYY-MM-DD'), frequency: item.frequency }
            temp.push(element)
        })
        data = temp
        res.json(new Response(data))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//2 READ
router.get('/', helpers.isLogged, async function (req, res, next) {
    try {
        let data = await DataDate.find();
        let temp = []
        data.forEach(item => {
            let element = { _id: item._id, letter: moment(item.letter).format('YYYY-MM-DD'), frequency: item.frequency }
            temp.push(element)
        })
        data = temp
        res.json(new Response(data))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//3 EDIT
router.put('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await DataDate.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.json(new Response({ message: 'Data have been updated', _id: data._id, letter: moment(data.letter).format('YYYY-MM-DD'), frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//4 ADD
router.post('/', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await DataDate.create({ ...req.body })
        res.json(new Response({ message: 'Data have been added', _id: data._id, letter: moment(data.letter).format('YYYY-MM-DD'), frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//5 DELETE
router.delete('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await DataDate.findByIdAndDelete(req.params.id)
        res.json(new Response({ message: 'Data have been deleted', _id: data._id, letter: moment(data.letter).format('YYYY-MM-DD'), frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

//6 FIND
router.get('/:id', helpers.isLogged, async function (req, res, next) {
    try {
        const data = await DataDate.findById(req.params.id)
        res.json(new Response({ message: 'Data found', _id: data._id, letter: moment(data.letter).format('YYYY-MM-DD'), frequency: data.frequency }))
    } catch (err) {
        console.log(err)
        res.status(500).json(new Response({ message: err }, false))
    }
});

module.exports = router;