const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const middleWare = require('../middleware/middleware.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const emailSender = require('../emailConfiguration/emailConfiguration')
require('dotenv').config()


router.get('/changeRequest/:email',async(req,res)=>{
    try{
     const {email} = req.params
     const data = await prisma.user.findFirst({
     where:{
         email:email
     }
 })

if(!data){
    res.send({state:false,message:`Email isn't exist`})
}else{
    const token = jwt.sign({ token: email }, process.env.JWT_SECRET, { expiresIn: '5m' });

    let message = `This email send from Ewallet to reset password , if you didn't send request to reset password just ignore this message.`
    let subject = 'Ewallet reset password'
    let url = `${process.env.WEB_SITE_URL}/auth/resetPassword?token=${token}`
    emailSender(email,message,subject,url)
    res.send({state:true})
}


    }catch{
        res.send({state:false,message:`Email isn't exist`})
    }

})

router.post('/reset',async(req,res)=>{
    try{
    const{password} = req.body 
    const token = req.header("x-auth-token");
 
    let email = ''
    try{
    email = jwt.verify(token, process.env.JWT_SECRET).token;
    }catch{
    res.send({state:false,message:'token is expired please submit your request again.'})
    }
    
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {

        try{
            const data = await prisma.user.update({
                where:{
                    email:email
                },data:{
                    password:hash
                }
            })
            res.send({state:true})    
        }catch{
            res.send({state:false})    
        }
      });
    });
    }catch{
        res.send({state:false})
    }
})

module.exports = router