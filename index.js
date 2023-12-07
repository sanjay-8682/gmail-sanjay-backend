import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './DataBase/dbconfig.js'
import gmailrouter from './Routers/gmail.router.js'

dotenv.config()
const port=process.env.PORT

const app=express()

app.search(cors())
app.use(express.json())
app.use('/api/gmail',gmailrouter)

connectDB();

app.listen(port,()=>{
    console.log("App is Listening",port);
})