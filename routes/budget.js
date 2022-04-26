const express = require("express")
const router = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('./middleware')


router.use(middleWare)

router.get('/',async(req,res)=>{
    try{
        const data = await prisma.budget.findMany({})
        res.json(data)
    }catch{
        res.send({message:"something went wrong"})
    }
})

router.get('/:id',async(req,res)=>{
    try{
    const {id} = req.params
    const data = await prisma.budget.findUnique(({
        where:{
            id:id
        }
    }))
    res.json(data)
    }catch{
        res.send({message:"something went wrong"})
    }
})

router.post('/',async(req,res)=>{
    try{
        const {walletId,name,amount,currency,catogery,recurrence,startedDate} = req.body
        const data = await prisma.budget.create({
            data:{
                walletId:walletId,
                name:name,
                amount:amount,
                currency:currency,
                catogery:catogery,
                recurrence:recurrence,
                startedDate:startedDate
            }
        })
        res.json(data)

    }catch{
        res.send({message:"something went wrong"})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const {walletId,name,amount,currency,catogery,recurrence,startedDate} = req.body
        const data = await prisma.budget.update({
            where:{
                id:id
            },
            data:{
                name:name,
                amount:amount,
                currency:currency,
                catogery:catogery,
                recurrence:recurrence,
                startedDate:startedDate
            }
        })
        res.json(data)
    }catch{
        res.send({message:"something went wrong"})
    }
})

router.delete('/',async(req,res)=>{
    try{
        const data = await prisma.budget.deleteMany({})
        res.json(data)
    }catch{
        res.send({message:"something went wrong"})  
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const data = await prisma.budget.delete({
            where:{
                id:id
            }
        })
        res.json(data)
    }catch{
        res.send({message:"something went wrong"})  
    }
})

module.exports = router

/**
 *   id           String @id @default(cuid())
  walletId     String
  wallet       Wallet @relation(fields: [walletId],references: [id])
  name         String
  amount       Float @default(0.0)
  currency     String
  catogery     String
  recurrence   String
  startedDate  DateTime
  createdAt    DateTime @default(now())
  lastUpdate   DateTime @updatedAt

 */