const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('../middleware/middleware')
const adminMiddleWare = require('../middleware/adminMiddleware')

router.get('/betweenDates/:fromDate?/:toDate?', middleWare, async (req, res) => {
    try {
        var { fromDate, toDate } = req.params
        const userId = req.headers.token
        var where;

        if (fromDate == undefined || toDate == undefined) {
            where = { userId }
        } else {
            if (fromDate.length > 2 && toDate.length > 2) {
                fromDate = new Date(fromDate)
                toDate = new Date(toDate)
                where = {
                    userId,
                    date: {
                        lte: toDate,
                        gte: fromDate
                    }
                }
            } else {
                where = { userId }
            }
        }

        const data = await prisma.transaction.findMany({
            where,
            include: {
                transactionCategory: true
            }
        })
        res.json({ state: true, data: data })
    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})

router.get('/', middleWare, async (req, res) => {
    try {
        const userId = req.headers.token
        const data = await prisma.transaction.findMany({
            where: {
                userId
            }
        })
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.get('/:id', middleWare, async (req, res) => {
    try {
        const { id } = req.params
        const data = await prisma.transaction.findUnique(({
            where: {
                id: id
            }
        }))
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.post('/', middleWare, async (req, res) => {
    try {
        const { id, type, categoryId, budgetId, icon, title, date, note, amount } = req.body
        var transaction;
        transaction = {
            userId: id,
            type: type,
            catogery: categoryId,
            budgetId: budgetId,
            title: title,
            note: note,
            icon: icon,
            date: date,
            amount: amount,
        }
        budgetId.length > 1 ? true : delete transaction.budgetId

        const data = await prisma.transaction.create({ data: transaction })
        res.send({ state: true, data: data })

    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})

router.put('/:id', middleWare, async (req, res) => {
    try {
        const { id } = req.params
        const { type, categoryId, date, title, icon, note, amount } = req.body
        const data = await prisma.transaction.update({
            where: {
                id: id
            },
            data: {
                type: type,
                catogery: categoryId,
                title: title,
                note: note,
                icon: icon,
                date: date,
                amount: amount,
                lastUpdate: new Date()
            }
        })
        res.json({ state: true, data: data })
    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})

router.delete('/', adminMiddleWare, async (req, res) => {
    try {
        const data = await prisma.transaction.deleteMany({})
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.delete('/:id', middleWare, async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const data = await prisma.transaction.delete({
            where: {
                userId: userId,
                id: id
            }
        })
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

module.exports = router