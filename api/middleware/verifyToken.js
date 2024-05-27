import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandeller } from "../utils/asyncHnadeler.js";
import jwt from 'jsonwebtoken'

export const verifyToken =asynchandeller(async(req,res,next)=>{
    const token= req.cookies?.accessToken || req.header
    ("Authorization")?.replace("Bearer","")
    
    if(!token){
        throw new ApiError(401 ,"unAuthorised Request")
    }
    const decodedToken=await jwt.verify(token,"kjhhkjasdkhjkhjasdad")
    console.log(decodedToken)
    const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    if (!user){
        throw new ApiError(401,"Invalid Access Token")
    }
    console.log(user)
    req.user=user
    next()


})