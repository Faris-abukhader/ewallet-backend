const express = require("express")
const router = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('./middleware')


router.use(middleWare)

router.get('/',async(req,res)=>{
    try{
    const data = await prisma.transactionCatogery.findMany({})
    res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const data = await prisma.transactionCatogery.findUnique({
            where:{
              id:id
            }
        })
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.post('/',async(req,res)=>{
    try{
        const {name,isExpenses,icon} = req.body
        const data = await prisma.transactionCatogery.create({
            data:{
                name:name,
                isExpenses:isExpenses,
                icon:icon
            }
        })
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const {name,isExpenses,icon} = req.body
        const data = await prisma.transactionCatogery.update({
            where:{
               id:id
            },
            data:{
                name:name,
                isExpenses:isExpenses,
                icon:icon
            }
        })
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.delete('/',async(req,res)=>{
    try{
        const data = await prisma.transactionCatogery.deleteMany({})
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const data = await prisma.transactionCatogery.delete({
            where:{
                id:id
            }
        })
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})


module.exports = router

/**
 *   id           String @id @default(cuid())
  name         String
  isExpenses   Boolean @default(false)
  icon         String 

 */