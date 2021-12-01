const jwt = require('jsonwebtoken')
const User = require('../models/User')
const key = require('../config/key.json')
const Response = require('../models/Response')

module.exports = {
    isLogged: async function (req, res, next) {
        let token = req.header('Authorization');
        token = token.split(' ')[1]
        const { email } = jwt.verify(token, key.privatekey)
        try {
            const user = await User.findOne({ email })
            if(user.token){
                return next()
            }
            res.json(new Response({message: 'user not valid'}, false))
        } catch (err) {
            console.log(err)
            res.status(500).json(new Response({message: 'not valid'}, false))
        }
    }
}