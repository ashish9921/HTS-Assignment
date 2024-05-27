import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

const app=express()
app.use(cors({origin:'*',Credentials:true}))  //origin denote accseptence from which url we can use mutiple method in cors lern on doc
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoute from './routes/user.routes.js'
app.use("/api/v1/users",userRoute)


export {app}