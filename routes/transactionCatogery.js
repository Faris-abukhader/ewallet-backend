const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('../middleware/middleware')


router.get('/', async (req, res) => {
    try {
        const data = await prisma.transactionCategory.findMany({})
        res.json(data)
    } catch {
        res.send({ message: 'something went wrong' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await prisma.transactionCategory.findUnique({
            where: {
                id: id
            }
        })
        res.json(data)
    } catch {
        res.send({ message: 'something went wrong' })
    }
})

router.post('/many', middleWare, async (req, res) => {
    let { data } = req.body
    data.map((item) => delete item['backgroundColor'])
    try {
        const records = await prisma.transactionCategory.createMany({ data })

        res.json({ state: true, data: records })
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.post('/', middleWare, async (req, res) => {
    try {
        const { name, isExpenses, icon } = req.body
        const data = await prisma.transactionCategory.create({
            data: {
                name: name,
                isExpenses: isExpenses,
                icon: icon
            }
        })
        res.json(data)
    } catch {
        res.send({ message: 'something went wrong' })
    }
})

router.put('/:id', middleWare, async (req, res) => {
    try {
        const { id } = req.params
        const { name, isExpenses, icon } = req.body
        const data = await prisma.transactionCategory.update({
            where: {
                id: id
            },
            data: {
                name: name,
                isExpenses: isExpenses,
                icon: icon
            }
        })
        res.json(data)
    } catch {
        res.send({ message: 'something went wrong' })
    }
})

router.delete('/', middleWare, async (req, res) => {
    try {
        const data = await prisma.transactionCategory.deleteMany({})
        res.json(data)
    } catch {
        res.send({ message: 'something went wrong' })
    }
})

router.delete('/:id', middleWare, async (req, res) => {
    try {
        const { id } = req.params
        const data = await prisma.transactionCategory.delete({
            where: {
                id: id
            }
        })
        res.json(data)
    } catch {
        res.send({ message: 'something went wrong' })
    }
})


module.exports = router
