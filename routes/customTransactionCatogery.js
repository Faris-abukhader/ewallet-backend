const express = require("express")
const router = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('../middleware/middleware')

router.get('/',middleWare,async(req,res)=>{
    try{
        const{token} = req.headers
        const result = await prisma.$queryRaw`select id , title ,icon ,type from customTransactionCategory WHERE userId = ${token} UNION select id , title ,icon ,type from transactionCategory`;
        res.json(result)
    
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.get('/:id',middleWare,async(req,res)=>{
    try{
        const {id} = req.params
        const data = await prisma.customTransactionCategory.findUnique({
            where:{
              id:id
            }
        })
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.post('/',middleWare,async(req,res)=>{
    try{
        const {userId,title,type,icon} = req.body
        const data = await prisma.customTransactionCategory.create({
            data:{
                userId:userId,
                title:title,
                type:type,
                icon:icon
            }
        })
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.put('/:id',middleWare,async(req,res)=>{
    try{
        const {id} = req.params
        const {name,isExpenses,icon} = req.body
        const data = await prisma.customTransactionCategory.update({
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

router.delete('/',middleWare,async(req,res)=>{
    try{
        const data = await prisma.customTransactionCategory.deleteMany({})
        res.json(data)
    }catch{
        res.send({message:'something went wrong'})
    }
})

router.delete('/:id',middleWare,async(req,res)=>{
    try{
        const {id} = req.params
        const data = await prisma.customTransactionCategory.delete({
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
