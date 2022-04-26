const express = require("express")
const router = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('./middleware')


router.use(middleWare)

router.get('/',async(req,res)=>{
    try{
        const data = await prisma.transaction.findMany({})
        res.json(data)
    }catch{
        res.send({message:"something went wrong"})
    }
})

router.get('/:id',async(req,res)=>{
    try{
    const {id} = req.params
    const data = await prisma.transaction.findUnique(({
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
        const {walletId,isExpenses,catogery,date,label,note,amount,currency} = req.body
        const data = await prisma.transaction.create({
            data:{
                walletId:walletId,
                isExpenses:isExpenses,
                catogery:catogery,
                date:date,
                label:label,
                note:note,
                amount:amount,
                currency:currency,
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
        const {isExpenses,catogery,date,label,note,amount,currency} = req.body
        const data = await prisma.transaction.update({
            where:{
                id:id
            },
            data:{
                isExpenses:isExpenses,
                catogery:catogery,
                date:date,
                label:label,
                note:note,
                amount:amount,
                currency:currency,
            }
        })
        res.json(data)
    }catch{
        res.send({message:"something went wrong"})
    }
})

router.delete('/',async(req,res)=>{
    try{
        const data = await prisma.transaction.deleteMany({})
        res.json(data)
    }catch{
        res.send({message:"something went wrong"})  
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const data = await prisma.transaction.delete({
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
  id            String @id @default(cuid())
  walletId      String 
  wallet        Wallet @relation(fields: [walletId],references: [id])
  title         String
  isExpenses    Boolean
  catogery      String
  note          String?
  amount        Float @default(0.0)
  currency      String
  createdAt     DateTime @default(now())
  lastUpdate    DateTime @updatedAt

 */