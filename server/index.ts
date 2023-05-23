import * as process from "process";
require('dotenv').config()
const router = require('./routes/index')
const sequelize = require('./db')
const models = require('./models/models')
const express = require('express')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path')



const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)



app.use(errorHandler)
const PORT = process.env.PORT || 5001



const start = async()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`SERVER STARTED ON PORT ${PORT}`))
    }catch (e){
        console.log(e)
    }
}
start()