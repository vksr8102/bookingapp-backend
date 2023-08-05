import express from "express"
import User from "../modles/User.js"
import { createError } from "../utils/error.js";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { veryfyAdmin, veryfyToken, veryfyUser } from "../utils/veryfyToken.js";
const router = express.Router();

// router.get("/checkauthentication",veryfyToken,(req,res,next)=>{
//     res.send( "hello,user you are logged in")
//  })
// router.get("/checkuser/:id",veryfyUser,(req,res,next)=>{
//     res.send( "hello user, you are logged in and you can delete your account")
//  })
router.get("/checkadmin/:id",veryfyAdmin,(req,res,next)=>{
    res.send( "hello admin, you are logged in and you can delete your all account")
 })

//UPDATE
router.put("/updateUser/:id",veryfyUser,updateUser);

//DELETE
router.delete("/:id",veryfyUser,deleteUser);

//GET
router.get("/:id",veryfyUser,getUser);

//GETALL
router.get("/",veryfyAdmin,getUsers);



export default router;