const User = require('../models/User.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { isAuthenticated } = require('../middlewares/route-guard.middleware')
router.get('/', (req, res) => {
    res.json('All good in auth')
})


router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        const potentialUser = await User.findOne({ email })
        if (!potentialUser) {
            const salt = bcrypt.genSaltSync(13)
            const hashedPassword = bcrypt.hashSync(password, salt)
            try {
                await User.create({ email, hashedPassword })
                res.status(2001).json({ message: 'User created' })
            } catch (error) {
                res.status(500).json({ message: "Problem with creating user" })
            }

        }
        else {
            res.status(400).json({ message: 'The email is already in use' })

        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'There was an error while trying to get a user' })
    }
})
