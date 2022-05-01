const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('./middleware')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const emailSender = require('../emailConfiguration/emailConfiguration')
require('dotenv').config()


router.use(middleWare)
router.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        var email = decoded.token
        console.log(email)
        const data = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                emailVerified: true
            }
        }).then(() => res.send(`<div style="width:100%;text-align: center;">email verify sucessfully , redirecting the page ...</div><script>window.location.href = 'http://localhost:3000/auth/signIn'</script>`))
            .catch(err => res.send({ state: false }))
    } catch (err) {
        res.send({ state: false, message: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await prisma.user.findMany({})
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await prisma.user.findUnique(({
            where: {
                id: id
            },
            include: {
                customTransactionCatogery: true,
                wallet: true
            }

        }))
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await prisma.user.findFirst(({
            where: {
                email: email,
            }
        }))
        const hashedPassword = data.password
        bcrypt.compare(password, hashedPassword, function (err, result) {
            if (err) {
                res.send({ error: err })
            }
            if (result) {
                res.json({ state: true })
            } else {
                res.json({ state: false })
            }
        });
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        bcrypt.genSalt(10, async function (err, salt) {
            if (err) {
                res.json({ err: err })
            }
            bcrypt.hash(password, salt, function (err, hashedPassword) {
                if (!err) {
                    const data = prisma.user.create({
                        data: {
                            firstName: firstName,
                            secondName: lastName,
                            email: email,
                            password: hashedPassword,
                        }
                    }).then((response) => {
                        if (response) {
                            res.json({ state: true })
                            const token = jwt.sign({ token: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                            emailSender(email, token)
                        }
                        res.json({ state: false })
                    })
                }
            });
        });
    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { firstName, lastName, age, gender } = req.body
        const data = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender
            }
        })
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.delete('/', async (req, res) => {
    try {
        const data = await prisma.user.deleteMany({})
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await prisma.user.delete({
            where: {
                id: id
            }
        })
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

module.exports = router