import express from "express"
import Hotel from "../modles/Hotel.js"
import { createError } from "../utils/error.js";
import { countByCity, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { veryfyAdmin } from "../utils/veryfyToken.js";
const router = express.Router();

//CREATE
router.post("/",veryfyAdmin,createHotel);

//UPDATE
router.put("/:id",veryfyAdmin,updateHotel);

//DELETE
router.delete("/:id",veryfyAdmin,deleteHotel);

//GET
router.get("/find/:id",getHotel);

//GETALL
router.get("/",getHotels);
router.get("/countBycity",countByCity);
router.get("/countByType",getHotels);



export default router;