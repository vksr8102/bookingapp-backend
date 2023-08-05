
import { createError } from "./error.js";
import jwt from "jsonwebtoken"

export const veryfyToken = (req,res,next)=>{
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401,"You are not authenticted!")) 

    jwt.verify(token,process.env.JWT,(err,user)=>{
        // console.log(user);
if(err) return next(createError(403,"Token is not valid!"))
req.user=user;
next()

    })
    
}

export const veryfyUser =(req,res,next)=>{
    veryfyToken(req,res,()=>{
        // console.log(req.user.isAdmin);
        if(req.user.id==req.params.id||req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorised"))  
        }
    })
}
export const veryfyAdmin =(req,res,next)=>{
    veryfyToken(req,res,()=>{
        // console.log(req.user.isAdmin);
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorised"))  
        }
    })
}