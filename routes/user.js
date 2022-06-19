const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('../middleware/middleware.js')
const adminMiddleWare = require('../middleware/adminMiddleware.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const emailSender = require('../emailConfiguration/emailConfiguration')
require('dotenv').config()


// need to craete user for test
// for frontend
router.get('/createUser', async (req, res) => {
    bcrypt.genSalt(10, async function (err, salt) {
        if (err) {
            res.send({ err: err })
        }

        bcrypt.hash('12345', salt, function (err, hashedPassword) {
            if (!err) {
                const data = prisma.user.create({
                    data: {
                        firstName: 'fares',
                        secondName: 'raed',
                        email: 'faresfares@yahoo.com',
                        password: hashedPassword,
                        emailVerified: true
                    }
                }).then((response) => {
                    res.json({ state: true, data: response })
                }).catch(() => res.json({ state: false, message: "something went wrong" }))
            }
        });
    });
})

// router.use(middleWare)
router.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        var email = decoded.token
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

router.get('/', adminMiddleWare, async (req, res) => {
    try {
        const data = await prisma.user.findMany({})
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.get('/:id/:fromDate?/:toDate?', async (req, res) => {
    try {
        const { id } = req.params
        var { fromDate, toDate } = req.params
        var include;

        if (fromDate == undefined || toDate == undefined) {
            include = {
                transactions: {
                    include: {
                        transactionCategory: true,
                    }
                },
                customTransactionCategory: true,
                budgets: {
                    include: {
                        categories: true,
                        transactions: true
                    }
                }
            }
        } else {
            if (fromDate.length > 2 && toDate.length > 2) {
                fromDate = new Date(fromDate)
                toDate = new Date(toDate)
                include = {
                    transactions: {
                        where: {
                            date: {
                                lte: toDate,
                                gte: fromDate
                            }
                        },
                        include: {
                            transactionCategory: true,
                        }
                    },
                    customTransactionCategory: true,
                    budgets: {
                        include: {
                            categories: true,
                            transactions: true
                        }
                    }
                }
            } else {
                include = {
                    transactions: {
                        include: {
                            transactionCategory: true,
                        }
                    },
                    customTransactionCategory: true,
                    budgets: {
                        include: {
                            categories: true,
                            transactions: true
                        }
                    }
                }
            }
        }

        let data = await prisma.user.findUnique(({
            where: {
                id: id,
            },
            include
        }))

        let transactionCategory = await prisma.transactionCategory.findMany({})
        data.transactionCategories = transactionCategory
        res.json({ state: true, data: data })
    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})

router.post('/auth', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        prisma.user.findFirst(({
            where: {
                email: email
            },
            select: {
                email: true,
                firstName: true,
                secondName: true,
                age: true,
                password: true,
                id: true
            }
        })).then((data) => {
            const hashedPassword = data.password
            bcrypt.compare(password, hashedPassword, function (err, result) {
                if (err) {
                    res.send({ error: err })
                }
                if (result) {
                    delete data.password
                    res.send({ user: data, state: true })
                } else {
                    res.send({ state: false })
                }
            });
        }).catch(() => {
            res.send({ state: false })
        })
    } catch {
        res.send({ message: "something went wrong" })
    }
})



router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        bcrypt.genSalt(10, async function (err, salt) {
            if (err) {
                res.send({ err: err })
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
                            let message = 'This email send from Ewallet to verify this email registeration , for verify this email click on the link below'
                            let subject = 'Ewallet email verifying'
                            let url = `${process.env.API_URL}/user/verify/${token}`
                            emailSender(email, message, subject, url)
                        } else {
                            res.send({ state: false })
                        }
                    })
                }
            });
        });
    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})

router.put('/:id', middleWare, async (req, res) => {
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

router.delete('/', adminMiddleWare, async (req, res) => {
    try {
        const data = await prisma.user.deleteMany({})
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.delete('/:id', middleWare, async (req, res) => {
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