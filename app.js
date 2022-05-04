const express = require("express")
const app = express()
const PORT = process.env.PORT || 4500
const cors = require("cors")
const bodyParser = require("body-parser")
const middleWare = require("./routes/middleware")
const user = require("./routes/user")
const wallet = require("./routes/wallet")
const budget = require("./routes/budget")
const transaction = require("./routes/transaction")
const transactionCatogery = require("./routes/transactionCatogery")
const customTransactionCatogery = require("./routes/customTransactionCatogery")
const password = require('./routes/password')


const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/user',user);
app.use('/wallet',wallet)
app.use('/budget',budget)
app.use('/transaction',transaction)
app.use('/transactionCatogery',transactionCatogery)
app.use('/customTransactionCatogery',customTransactionCatogery)
app.use('/password',password)


app.get("/",async(req,res)=>{
    res.send({message:"hello world"})
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash('Fares_455.', salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         res.send({hashedPassword:hash})
    //     });
    // });

    // const firstHashedPassword = '$2b$10$DFmeqbbYr2c6NJKC0z8c9uS4LDyWjqDYmiDg18OVhrZUbIBlvrnbS'
    // bcrypt.compare('Fares_455.', firstHashedPassword, function(err, result) {
    //     if(err){
    //         res.send({error:err})
    //     }
    //     res.send({result:result})
    // });
    
    
    // res.send({message:"hello world"})
})

app.post("/",(req,res)=>{
    const {token} = req.body
    try{
        var decoded = jwt.verify(token, 'secret');
        res.json({decoded})    
    }catch{
       res.json({message:'something went wrong'})
    }
})

app.listen(PORT,()=>{
    console.log(`this application can be found at localhost:${PORT}`)
})