var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const key = require('../config/key.json')
const Response = require('../models/Response')
const helpers = require('../helpers/util')

router.post('/register', async function (req, res, next) {
  try {
    if (req.body.retypepassword == req.body.password) {
      const user = await User.create({ ...req.body })
      const token = jwt.sign({ email: user.email }, key.privatekey);
      user.token = token
      user.save(() => {
        const data = { email: user.email, token }
        res.json(new Response(data))
      })
    } else {
      throw 'retypepassword is not match'
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err }, false))
  }
});

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) { res.json(new Response({ message: 'User not found' }, false)) }
    else {
      user.comparePassword(password, function (err, isMatch) {
        console.log(isMatch)
        if (err) {
          throw err
        } else if (!isMatch) {
          res.json(new Response({ message: 'Password not match' }, false))
        } else {
          const token = jwt.sign({ email: user.email }, key.privatekey);
          user.token = token
          user.save(() => {
            const data = { email: user.email, token }
            res.json(new Response(data))
          })
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err }, false))
  }
});

router.post('/check', async function (req, res, next) {
  let check
  try {
    const user = await User.findOne({ token: req.body.token })
    if (user) {
      check = true
    } else {
      check = false
    }
    res.json(new Response({ valid: check }))
  } catch (err) {
    res.status(500).json(new Response({ message: err }, false))
  }
});

router.get('/destroy', helpers.isLogged, async function (req, res, next) {
  let token = req.header('Authorization');
  token = token.split(' ')[1];
  const { email } = jwt.verify(token, key.privatekey)
  try {
    const user = await User.findOne({ email })
    user.token = null
    user.save(() => {
      res.json(new Response({ logout: true }))
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err }, false))
  }
});

//nonsoal
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find()
    res.json(new Response(users))
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err }, false))
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await User.findByIdAndRemove(req.params.id)
    res.json(new Response(user))
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err }, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    res.json(new Response(user))
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err }, false))
  }
});

module.exports = router;
