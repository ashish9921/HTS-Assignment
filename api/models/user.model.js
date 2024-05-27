import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const userSchema= mongoose.Schema({
    First_Name:{
        type:String,
        required:true,
       
     
        trim:true,
       
    },
    email:{
        type:String,
        required:[true,"email is requred"],
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    Last_Name:{
        type:String,
        required:true,
        trim:true,
        index:true
    },

    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshToken:{
        type:String
    }

},{
    timestamps:true
})

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();

    this.password= await bcrypt.hash(this.password, 10)
    next()
    
})

userSchema.methods.isPasswordCorrect =async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genAccessToken=function () {
    return jwt.sign({
        _id:this._id,
        email:this.email,
        Last_Name:this.Last_Name
    },
   process.env.JWT_TOKEN_ACCESS,
    {
        expiresIn:'2d'
    }
    )
}
userSchema.methods.generateRefreshtoken=function () {
    return jwt.sign({
        _id:this._id,
    },
    process.env.JWT_TOKEN_REFRESH,
    {
        expiresIn:'10d'
    }
    )
}
const User = mongoose.model('User',userSchema)

export {User}


