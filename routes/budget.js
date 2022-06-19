const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('../middleware/middleware.js')
const adminMiddleWare = require('../middleware/adminMiddleware.js')
const { randomUUID } = require('crypto');


router.get('/', adminMiddleWare, async (req, res) => {
    try {
        const data = await prisma.budget.findMany({ include: { categories: true, transactions: true } })
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.get('/ids', async (req, res) => {
    const userId = req.headers.token
    try {
        let data = await prisma.budget.findMany(({
            where: {
                userId: userId
            },
            select: {
                id: true
            }
        }))
        res.json({ state: true, data: data })
    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})
router.get('/allUserBudgets/:id', async (req, res) => {
    const userId = req.headers.token
    try {
        const { id } = req.params
        let data = await prisma.budget.findMany(({
            where: {
                userId: userId
            },
            include: {
                categories: true,
                transactions: true
            }

        }))
        res.json(data)
    } catch {
        res.send({ state: false, message: "something went wrong" })
    }
})
router.get('/:id', middleWare, async (req, res) => {

    const userId = req.headers.token
    try {
        const { id } = req.params
        let data = await prisma.budget.findUnique(({
            where: {
                id: id
            },
            include: {
                categories: true,
                transactions: true
            }

        }))
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }

})

router.post('/', middleWare, async (req, res) => {
    try {
        let { userId, title, amount, targetCategories, startedDate, endDate } = req.body

        // creating new budget 
        const data = await prisma.budget.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                name: title,
                amount: amount,
                startedDate: startedDate,
                endDate: endDate,
                currency: 'USD'
            }
        })

        // getting transaction categories id 
        targetCategories.map((item) => {
            item.id = randomUUID()
        })

        // creating budget transaction categories
        const catogeries = await prisma.budget.update({
            where: {
                id: data.id
            },
            data: {
                categories: {
                    createMany: {
                        data: targetCategories
                    }
                }
            }
        })

        // returning the budget with transactions and transaction categories 
        let newBudget = await prisma.budget.findUnique(({
            where: {
                id: data.id
            },
            include: {
                categories: true,
                transactions: true
            }

        }))
        res.json({ state: true, data: newBudget })

    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.put('/:id', middleWare, async (req, res) => {
    try {
        const { id } = req.params
        const { name, amount, currency, targetCategories, startedDate, endDate } = req.body

        // first delete budget's categories
        const updatedCategory = await prisma.budget.update({
            where: {
                id
            },
            data: {
                categories: {
                    deleteMany: {}
                }
            }
        })

        // targetCategories.map((item)=>item.budgetId = null)

        // update budget info and add new categories list
        const data = await prisma.budget.update({
            where: {
                id: id
            },
            data: {
                name: name,
                amount: amount,
                currency: 'USD',
                categories: {
                    createMany: {
                        data: targetCategories
                    }
                },
                startedDate: startedDate,
                endDate: endDate
            }
        })

        // fetching the modified budget
        let newBudget = await prisma.budget.findUnique(({
            where: {
                id: id
            },
            include: {
                categories: true,
                transactions: true
            }

        }))
        res.json({ state: true, data: newBudget })

    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.delete('/', adminMiddleWare, async (req, res) => {
    try {
        const data = await prisma.budget.deleteMany({})
        res.json(data)
    } catch {
        res.send({ message: "something went wrong" })
    }
})

router.delete('/:id', middleWare, async (req, res) => {
    try {
        const { id } = req.params
        const data = await prisma.budget.delete({
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