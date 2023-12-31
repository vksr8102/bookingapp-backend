import User from "../modles/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import Jwt  from "jsonwebtoken";

export const register =async(req,res,next)=>{
    try{
        //code to validate user data
        var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password, salt);
const newUser = new User({
    username:req.body.username,
    email : req.body.email,
    password:hash
})
await newUser.save()
res.status(201).json("User has been created")
    }
    catch (error) {
        next(error)
    }
}

export const login = async(req,res,next)=>{
    try {
        const user =await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User Not Found!"))
        
       const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,"Wrong password or username"))
const token = Jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

const {password,isAdmin,...otherDetiled}=user._doc;
console.log(isAdmin);
        res.cookie("accessToken",token,{
            httpOnly:true
        }).status(200).json({...otherDetiled})
    } catch (error) {
        next(error)
    }
}