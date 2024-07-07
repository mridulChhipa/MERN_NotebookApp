const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'thisIsiNotebook'

const User = require('../models/User.js')

const fetchUser = require('../middleware/fetchUser.js')

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {
    const result = validationResult(req)

    if (result.isEmpty()) {

        try {
            let user = await User.findOne({
                email: req.body.email
            })

            if (user) {
                return res.status(400).json({ error: "This email has already been used" })
            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)

            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })

            const data = {
                user: {
                    id: user._id,
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)

            res.json(authToken)

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Some internal server error occured')
        }
    } else {
        return res.status(400).json({ errors: result.array() })
    }
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success, error: 'Please try to login with correct credentials' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        
        if (!passwordCompare) {
            return res.status(400).json({success, error: 'Please try to login with correct credentials' })
        }

        const data = {
            user: {
                id: user._id,
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken})

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Some internal server error occured')
    }

})

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id
        user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Some internal server error occured')
    }
})

module.exports = router