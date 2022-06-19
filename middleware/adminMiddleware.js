const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
module.exports = async(req,res,next)=>{
    try{
        const token = req.headers.token
        const user = await prisma.user.findFirst({
            where:{
                id:token,
                role:'admin'
            }
        })
    
        if(user){
          next()
        }else{
         return res.send({state:false,'message':'Token is not authorized.'})
        }    
    }catch{
        return res.send({state:false,'message':'No token found.'})
    }
}