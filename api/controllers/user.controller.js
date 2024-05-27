import { ApiError } from "../utils/ApiError.js";
import { asynchandeller } from "../utils/asyncHnadeler.js";
import { User } from "../models/user.model.js";

// function for generate Access Token And Refrence Token
const generateAccessAndRefereshToken=async(userId)=>{
    try{
        const user = await User.findById(userId)
        // -note below  function created in user modules  
        const accessToken =user.genAccessToken()
        const refreshToken =user.generateRefreshtoken()
        
        user.refreshToken=refreshToken

        await user.save({validateBeforSave:false})
        return {accessToken,refreshToken}
    }
    catch(error){
        throw new ApiError(500,"somthing went wrong while generating refresh and access token")
    }
}

const registerUser=asynchandeller(async (req,res)=>{
//details which requird take from frontend and body
const {First_Name,Last_Name,email,password}=req.body

//validate -not empty
if([First_Name,Last_Name,email,password].some((field)=>field?.trim()==="")){
    throw new ApiError(400,"All fields are required")
}
const existUser=await User.findOne({
  email
})
// check if user already exist :email
if(existUser){
    throw new ApiError(409, "user with email  already exists") 
}
//create user object - create entry in db
const createUser =User.create({
    Last_Name,
   
    email,
    password,
    First_Name
})

// return responce 
res.status(201).json({success:true,message:"created"})


})

const loginuser=asynchandeller(async(req,res)=>{

    //get email from body email
    const {password,email}=req.body

    if( !email){
        throw new ApiError(400 ,"user or email is requred")
    }
// find user
    const user=await User.findOne({
        email
    })
    

    if(!user){
        throw new ApiError(400 ,"user not fout")
    }
     // password check  -note isPasswordCorect is function creted in user modules  
    const isPasswordValid =await user.isPasswordCorrect(password) 
    if(!isPasswordValid){
        throw new ApiError(401 ,"invalid user credential")
    }
     // access and refresh token -note this function  located start of this file

    const {accessToken , refreshToken}=await generateAccessAndRefereshToken(user._id)
    
    const loggedInUser =await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true
    } 
       
    //send cookies
    return res.status(200)
    .cookie("accessToken",accessToken) 
    .cookie("refreshToken",refreshToken)
    .status(200).json({user:loggedInUser,accessToken,refreshToken ,message:"user logged in successfully"}) 
})



export {registerUser,loginuser}