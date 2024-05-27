
import mongoose from 'mongoose'
import {app} from './app.js'

try {
    const dbConnect=mongoose.connect(process.env.DATA_BASE) 
    console.log("mongodb connected")
} catch (error) {
    console.log("mongodb give error")
    
}


app.listen(2000,()=>{
    console.log('app is running')
})

