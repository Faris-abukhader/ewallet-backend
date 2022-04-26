const express = require("express")
const router = express.Router()
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('./middleware')


router.use(middleWare)

router.get('/:id',async(req,res)=>{
//   try{
    const {id} = req.params
    const data = await prisma.wallet.findMany({
        where:{
            id:id
        }
    })
    res.json(data)
//   }catch{
//   res.send({message:"something went wrong"})
//   }
})

router.get('/',async(req,res)=>{
    // try{
    const data = await prisma.wallet.findUnique({
        where:{
            id:id
        }
    })
    res.json(data)
// }catch{
//    res.send({message:"something went wrong"}) 
// }

})

router.put('/:id',async(req,res)=>{
    const {id} = req.params
    const {title,amount,currency} = req.body
    // try{
        const data = await prisma.wallet.update(({
            where:{
                id:id
            },
            data:{
              title:title,
              amount:amount,
              currency:currency  
            }
        }))

        res.json(data)

    // }catch{
    //     res.send({message:"something went wrong"})
    // }
})

router.delete('/:id',async(req,res)=>{
    // try{
      const {id} = req.params
      const data = await prisma.wallet.delete({
          where:{
              id:id
          }
      })
      res.json(data)
    // }catch{
    //     res.send({message:"something went wrong"})
    // }
    
})

module.exports = router


/*
model Wallet {
  id            String    @id @default(cuid())
  userId        String  
  user          User @relation(fields: [userId],references: [id])
  title         String @unique
  amount        Float @default(0.0)
  currency      String 
  createdAt     DateTime @default(now())
  lastUpdate    DateTime @updatedAt
  transactions  Transaction[]
  budgets       budget[]
}

*/