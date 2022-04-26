const express = require("express")
const app = express()
const PORT = process.env.PORT || 4500
const cors = require("cors")
const bodyParser = require("body-parser")
const middleWare = require("./routes/middleware")
const wallet = require("./routes/wallet")
const budget = require("./routes/budget")
const transaction = require("./routes/transaction")
const transactionCatogery = require("./routes/transactionCatogery")
const customTransactionCatogery = require("./routes/customTransactionCatogery")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/wallet',wallet)
app.use('/budget',budget)
app.use('transaction',transaction)
app.use('transactionCatogery',transactionCatogery)
app.use('customTransactionCatogery',customTransactionCatogery)


app.get("/",(req,res)=>{
    res.send({message:"hello world"})
})

app.listen(PORT,()=>{
    console.log(`this application can be found at localhost:${PORT}`)
})