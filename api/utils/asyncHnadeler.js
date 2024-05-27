const asynchandeller=(reqFunctionHandeller)=>{
    return (req,res,next) =>{
Promise.resolve(reqFunctionHandeller(req,res,next)).catch((err)=>next(err))
    }
}
export {asynchandeller}