const express = require("express")
const app = express()
const PORT = process.env.PORT || 4500
const cors = require("cors")
const bodyParser = require("body-parser")
const user = require("./routes/user")
const budget = require("./routes/budget")
const transaction = require("./routes/transaction")
const transactionCatogery = require("./routes/transactionCatogery")
const customTransactionCategory = require("./routes/customTransactionCatogery")
const password = require('./routes/password')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/user',user);
app.use('/budget',budget)
app.use('/transaction',transaction)
app.use('/transactionCatogery',transactionCatogery)
app.use('/customTransactionCategory',customTransactionCategory)
app.use('/password',password)


app.listen(PORT,()=>{
    console.log(`this application can be found at localhost:${PORT}`)
})