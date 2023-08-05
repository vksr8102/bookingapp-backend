import express from "express"

const router = express.Router();
import { veryfyAdmin } from "../utils/veryfyToken.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";

//CREATE
router.post("/:hotelid",veryfyAdmin,createRoom);

//UPDATE
router.put("/:id",veryfyAdmin,updateRoom);

//DELETE
router.delete("/delete/:id",veryfyAdmin,deleteRoom);

//GET
router.get("/:id",getRoom);

//GETALL
router.get("/",getRooms);


export default router;